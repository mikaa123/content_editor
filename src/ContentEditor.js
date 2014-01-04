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
    function ContentEditor(el) {
        this.el = el;
        /**
        * A hash mapping state names to forbidden key checking functions.
        */
        this.forbiddenKeyFnForState = {};
        this.$el = $(el);

        if (!this.$el.length)
            throw 'No DOM element found.';
        this.placeHolderText = this.$el.data('placeholder');
        if (this.placeHolderText && this.placeHolderText.length) {
            this.changeState(PlaceHolderState._instance);
        } else {
            this.changeState(EditingState._instance);
        }

        this.initListeners();
    }
    /**
    * State transition goes through this method, although it's the states themselves who
    * know when to transition state.
    *
    * @param state
    */
    ContentEditor.prototype.changeState = function (state) {
        this.state = state;
        state.initState(this);
    };

    /***
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

    ContentEditor.prototype.initListeners = function () {
        var _this = this;
        // Depending in the state, different things will be done.
        this.$el.on('mousedown blur keydown keyup', function (e) {
            var stateHandler = _this.state[e.type];
            stateHandler && stateHandler.call(_this.state, _this, e);
        });
    };

    ContentEditor.prototype.isKeyForbidden = function (stateName, e) {
        return this.forbiddenKeyFnForState[stateName] && this.forbiddenKeyFnForState[stateName](e);
    };
    return ContentEditor;
})();
//# sourceMappingURL=ContentEditor.js.map
