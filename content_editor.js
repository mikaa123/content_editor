/**
* Created by michaelsokol on 28/12/2013.
*/
/// <reference path="libs/jquery.d.ts" />
/**
* This holds the different states a ContentEditor can be in.
*/
var EditorStates;
(function (EditorStates) {
    EditorStates[EditorStates["PLACEHOLDER"] = 0] = "PLACEHOLDER";
    EditorStates[EditorStates["EDITOR"] = 1] = "EDITOR";
})(EditorStates || (EditorStates = {}));

var ContentEditor = (function () {
    function ContentEditor(el) {
        this.el = el;
        var placeholderText;

        this.$el = $(el);

        placeholderText = this.$el.data('placeholder');

        if (placeholderText && placeholderText.length) {
            this.state = 0 /* PLACEHOLDER */;
            this.$el.addClass('is-placeholder');
            $('<p/>', {
                text: placeholderText
            }).appendTo(this.$el);
        }
    }
    return ContentEditor;
})();
//# sourceMappingURL=content_editor.js.map
