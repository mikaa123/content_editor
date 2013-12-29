/**
* Created by michaelsokol on 28/12/2013.
*/
/// <reference path="libs/jquery.d.ts" />
var EditorStates;
(function (EditorStates) {
    EditorStates[EditorStates["PLACEHOLDER"] = 0] = "PLACEHOLDER";
    EditorStates[EditorStates["EDITOR"] = 1] = "EDITOR";
})(EditorStates || (EditorStates = {}));

var ContentEditor = (function () {
    function ContentEditor(el) {
        this.el = el;
        this.state = 1 /* EDITOR */;
        this.$el = $(el);

        if (!this.$el.length)
            throw 'No DOM element found.';

        this.placeHolderText = this.$el.data('placeholder');

        if (this.placeHolderText && this.placeHolderText) {
            this.showPlaceholder();
        }
    }
    ContentEditor.prototype.showPlaceholder = function () {
        this.state = 0 /* PLACEHOLDER */;
        this.$el.addClass('is-placeholder');
        $('<p/>', {
            text: this.placeHolderText
        }).appendTo(this.$el);
    };
    return ContentEditor;
})();
//# sourceMappingURL=content_editor.js.map
