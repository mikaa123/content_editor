/**
* Created by michaelsokol on 04/01/2014.
*/
/// <reference path="../ContentEditor.ts" />
/// <reference path="states.d.ts" />
var EditorState = (function () {
    function EditorState(stateName) {
        this.stateName = stateName;
        this.stateClass = 'is-' + this.stateName;
    }
    EditorState.prototype.initState = function (editor) {
        editor.$el.addClass(this.stateClass);
    };
    return EditorState;
})();
//# sourceMappingURL=EditorState.js.map
