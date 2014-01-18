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
//# sourceMappingURL=EditingState.js.map
