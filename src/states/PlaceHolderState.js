/**
* Created by michaelsokol on 04/01/2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="EditorState.ts" />
/// <reference path="states.d.ts" />
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
//# sourceMappingURL=PlaceHolderState.js.map
