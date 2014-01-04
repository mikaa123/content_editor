/**
* Created by michaelsokol on 04/01/2014.
*/
/// <reference path="../ContentEditor.ts" />
var EditorState = (function () {
    function EditorState() {
    }
    EditorState.prototype.initState = function (editor) {
        editor.$el.addClass(this.stateClass);
    };
    return EditorState;
})();
//# sourceMappingURL=EditorState.js.map
