var EditorState = (function () {
    function EditorState(stateName) {
        this.stateName = 'placeholder';
        this.stateClass = 'is-' + this.stateName;
    }
    EditorState.prototype.initState = function (editor) {
        editor.$el.addClass(this.stateClass);
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
    function EditingState() {
        _super.call(this, 'editing');
    }
    EditingState.prototype.initState = function (editor) {
        _super.prototype.initState.call(this, editor);
    };

    EditingState.prototype.keydown = function (editor, e) {
    };

    EditingState.prototype.blur = function (editor, e) {
        if (!editor.$el.text().length) {
            editor.changeState(PlaceHolderState._instance);
        }
    };
    EditingState._instance = new EditingState();
    return EditingState;
})(EditorState);
var PlaceHolderState = (function (_super) {
    __extends(PlaceHolderState, _super);
    function PlaceHolderState() {
        _super.call(this, 'placeholder');
    }
    PlaceHolderState.prototype.initState = function (editor) {
        var $editor = editor.$el, placeHolderText = $editor.data('placeholder');

        _super.prototype.initState.call(this, editor);

        $editor.empty();
        $('<p>', { text: placeHolderText }).appendTo($editor);
    };

    PlaceHolderState.prototype.mousedown = function (editor, e) {
        var sel, range;

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

    PlaceHolderState.prototype.keydown = function (editor, e) {
        var $editor = editor.$el;

        if (editor.isKeyForbidden(this.stateName, e))
            return;

        $editor.find(':first-child').text('');
        $editor.removeClass('is-placeholder');

        editor.changeState(EditingState._instance);
    };
    PlaceHolderState._instance = new PlaceHolderState();
    return PlaceHolderState;
})(EditorState);
var ContentEditor = (function () {
    function ContentEditor(el) {
        this.el = el;
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
    ContentEditor.prototype.changeState = function (state) {
        this.state = state;
        state.initState(this);
    };

    ContentEditor.prototype.addForbiddenKeyFn = function (stateName, fn) {
        this.forbiddenKeyFnForState[stateName] = fn;
    };

    ContentEditor.prototype.initListeners = function () {
        var _this = this;
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
