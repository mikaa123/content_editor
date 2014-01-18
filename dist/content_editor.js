var EditorState = (function () {
    function EditorState(stateName, editor) {
        this.stateName = stateName;
        this.editor = editor;
        this.stateClass = 'is-' + this.stateName;
    }
    EditorState.prototype.initState = function () {
        this.editor.$el.addClass(this.stateClass);
    };

    EditorState.prototype.keydown = function (e) {
        if (!this.isTypingAllowed(e)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        this.handle(e);
        ;
    };

    EditorState.prototype.mousedown = function (e) {
        this.handle(e);
    };

    EditorState.prototype.blur = function (e) {
        this.handle(e);
    };

    EditorState.prototype.handle = function (e) {
        var handler = this[e.type + 'Handler'];
        handler && handler.call(this, e);
    };

    EditorState.prototype.isTypingAllowed = function (e) {
        var editor = this.editor, options = editor.options, isKeyForbidden = this.isKeyForbidden && this.isKeyForbidden(e) || false;

        if (!options.maxLength || this.stateName === 'placeholder') {
            return !isKeyForbidden;
        }

        return !isKeyForbidden && editor.length() <= options.maxLength || e.which === 8;
    };
    return EditorState;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EditingState = (function (_super) {
    __extends(EditingState, _super);
    function EditingState(editor) {
        _super.call(this, 'editing', editor);
    }
    EditingState.prototype.initState = function () {
        _super.prototype.initState.call(this);
    };

    EditingState.prototype.blur = function (e) {
        if (!this.editor.$el.text().length) {
            this.editor.changeState('placeholder');
        }
    };
    return EditingState;
})(EditorState);
var PlaceHolderState = (function (_super) {
    __extends(PlaceHolderState, _super);
    function PlaceHolderState(editor) {
        _super.call(this, 'placeholder', editor);
    }
    PlaceHolderState.prototype.initState = function () {
        var $editor = this.editor.$el, placeHolderText = $editor.data('placeholder');

        _super.prototype.initState.call(this);

        $editor.empty();
        $('<p>', { text: placeHolderText }).appendTo($editor);
    };

    PlaceHolderState.prototype.mousedownHandler = function (e) {
        var editor = this.editor, sel, range;

        e.preventDefault();
        e.stopPropagation();

        if (editor.$el.text() === editor.$el.data('placeholder')) {
            range = document.createRange();
            sel = window.getSelection();
            range.setStart(editor.el.childNodes[0], 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };

    PlaceHolderState.prototype.keydownHandler = function (e) {
        var $editor = this.editor.$el;

        $editor.find(':first-child').text('');
        $editor.removeClass('is-placeholder');

        this.editor.changeState('editing');
    };
    return PlaceHolderState;
})(EditorState);
var ContentEditor = (function () {
    function ContentEditor(el, params) {
        this.el = el;
        this.$el = $(el);
        this.options = params.options;
        this.states = params.states || {
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
    ContentEditor.prototype.changeState = function (stateName) {
        if (!stateName || !this.states[stateName]) {
            throw 'Undefined stateName';
        }

        this.state = this.states[stateName];
        this.state.initState();
    };

    ContentEditor.prototype.addForbiddenKeyFn = function (stateName, fn) {
        this.states[stateName].isKeyForbidden = fn;
    };

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

    ContentEditor.prototype.addState = function (stateName, state) {
        this.states[stateName] = state;
    };

    ContentEditor.prototype.setStateProperty = function (stateName, props) {
        var state = this.states[stateName];
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
