/**
* Created by michaelsokol on 04/01/2014.
*/
/// <reference path="../ContentEditor.ts" />
/// <reference path="states.d.ts" />
var EditorState = (function () {
    function EditorState(stateName, editor) {
        this.stateName = stateName;
        this.editor = editor;
        this.stateClass = 'is-' + this.stateName;
    }
    EditorState.prototype.initState = function (editor) {
        editor.$el.addClass(this.stateClass);
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
        var editor = this.editor, options = editor.options, isKeyForbidden = this.isKeyForbidden(e);

        if (!options.maxLength) {
            return !isKeyForbidden;
        }

        return !isKeyForbidden && editor.length() <= options.maxLength || e.which === 8;
    };

    EditorState.prototype.isKeyForbidden = function (e) {
        return false;
    };
    return EditorState;
})();
//# sourceMappingURL=EditorState.js.map
