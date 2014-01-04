/**
* Created by michaelsokol on 29/12/2013.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var EditorState = (function () {
    function EditorState() {
    }
    EditorState.prototype.initState = function (editor) {
        editor.$el.addClass(this.stateClass);
    };
    return EditorState;
})();

var PlaceHolderState = (function (_super) {
    __extends(PlaceHolderState, _super);
    function PlaceHolderState() {
        _super.call(this);
        this.stateClass = 'is-placeholder';
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
        $editor.find(':first-child').text('');
        $editor.removeClass('is-placeholder');

        editor.changeState(EditingState._instance);
    };
    PlaceHolderState._instance = new PlaceHolderState();
    return PlaceHolderState;
})(EditorState);

var EditingState = (function (_super) {
    __extends(EditingState, _super);
    function EditingState() {
        _super.call(this);
        this.stateClass = 'is-editing';
    }
    EditingState.prototype.initState = function (editor) {
        _super.prototype.initState.call(this, editor);

        alert('is-editing!');
    };

    EditingState.prototype.mousedown = function (editor, e) {
        alert("hey!");
    };

    EditingState.prototype.keydown = function (editor, e) {
        alert("ho!");
    };
    EditingState._instance = new EditingState();
    return EditingState;
})(EditorState);
//# sourceMappingURL=editor_states.js.map
