/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="EditorState.ts" />
/// <reference path="states.d.ts" />

class PlaceHolderState extends EditorState {

	constructor(editor: ContentEditor) {
		super('placeholder', editor);
	}

	public initState(editor: ContentEditor) {
		var $editor = editor.$el,
			placeHolderText = $editor.data('placeholder');

		super.initState(editor);

		$editor.empty();
		$('<p>', { text: placeHolderText }).appendTo($editor);
	}

	mousedownHandler(e: JQueryEventObject) {
		var editor = this.editor,
			sel,
			range;

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
	}

	keydownHandler(e: JQueryEventObject) {
		var $editor = this.editor.$el;

		$editor.find(':first-child').text('');
		$editor.removeClass('is-placeholder');

		this.editor.changeState('editing');
	}
}
