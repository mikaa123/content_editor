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
/// <reference path="Interactable.ts" />
/// <reference path="../ContentEditor.ts" />
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

    EditingState.prototype.blur = function (editor, e) {
        if (!editor.$el.text().length) {
            editor.changeState(PlaceHolderState._instance);
        }
    };
    EditingState._instance = new EditingState();
    return EditingState;
})(EditorState);
//# sourceMappingURL=EditingState.js.map
