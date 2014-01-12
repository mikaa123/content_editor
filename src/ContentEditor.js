/**
* Created by michaelsokol on 28/12/2013.
*/
/// <reference path="libs/jquery.d.ts" />
/// <reference path="states/states.d.ts" />
/***
* A mode-oriented base class for building mode-oriented editors.
* In essence, it's mainly an implementation of the State pattern [1] applied to content-editable elements.
*
* [1]: (http://en.wikipedia.org/wiki/State_pattern)
*
* @class
*/
var ContentEditor = (function () {
    // TODO: Keyword - arguments?
    function ContentEditor(el, statesMap, options) {
        this.el = el;
        this.options = options;
        /**
        * A hash mapping state names to forbidden key checking functions.
        */
        this.forbiddenKeyFnForState = {};
        this.$el = $(el);
        this.statesMap = statesMap || {
            'placeholder': new PlaceHolderState(this),
            'editing': new EditingState(this)
        };

        if (!this.$el.length)
            throw 'No DOM element found.';
        this.placeHolderText = this.$el.data('placeholder');
        if (this.placeHolderText && this.placeHolderText.length) {
            this.changeState('placeholder');
        } else {
            this.changeState('editing');
        }

        this.initListeners();
    }
    /**
    * State transition goes through this method, although it's the states themselves who
    * know when to transition stateName.
    *
    * @param stateName
    */
    ContentEditor.prototype.changeState = function (stateName) {
        if (!stateName || !this.statesMap[stateName]) {
            throw 'Undefined stateName';
        }

        this.state = this.statesMap[stateName];
        this.state.initState(this);
    };

    /**
    * Each state is a Flyweight pattern (http://en.wikipedia.org/wiki/Flyweight_pattern),
    * as a result, they can't hold an extrinsic state. In this case, the ContentEditor acts
    * as a Context, and this is where instance-specific information concerning keyboard validation
    * is stored.
    *
    * Each function returns a boolean indicating whether the key represented in the JQueryEventObject
    * is forbidden.
    *
    * @param stateName
    * @param fn
    */
    ContentEditor.prototype.addForbiddenKeyFn = function (stateName, fn) {
        this.forbiddenKeyFnForState[stateName] = fn;
    };

    /**
    * Checks if the editor is valid according to the option hash passed to the constructor.
    */
    ContentEditor.prototype.isValid = function () {
        var textLength, validity = true, errors = [];

        if (!this.options) {
            return { isValid: true, errors: [] };
        }

        textLength = this.$el.text().length;
        if (this.options.maxLength && textLength > this.options.maxLength) {
            validity = false;
            errors.push('maxLength');
        }
        if (this.options.minLength && textLength <= this.options.minLength) {
            validity = false;
            errors.push('minLength');
        }
        if (!this.options.allowEmpty && this.state.stateName === 'placeholder' || !this.options.allowEmpty && this.state.stateName !== 'placeholder' && !textLength) {
            validity = false;
            errors.push('allowEmpty');
        }

        return {
            isValid: validity,
            errors: errors
        };
    };

    ContentEditor.prototype.isKeyForbidden = function (stateName, e) {
        return this.forbiddenKeyFnForState[stateName] && this.forbiddenKeyFnForState[stateName](e);
    };

    ContentEditor.prototype.addState = function (stateName, state) {
        this.statesMap[stateName] = state;
    };

    ContentEditor.prototype.setStateProperty = function (stateName, props) {
        var state = this.statesMap[stateName];
        if (!state) {
            state = new EditorState(stateName, this);
        }

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                state[prop] = props[prop];
            }
        }
    };

    ContentEditor.prototype.length = function () {
        return this.$el.text().length;
    };

    ContentEditor.prototype.initListeners = function () {
        var _this = this;
        this.$el.on('mousedown blur keydown keyup', function (e) {
            _this.state[e.type] && _this.state[e.type](e);
        });
    };
    return ContentEditor;
})();
//# sourceMappingURL=ContentEditor.js.map
