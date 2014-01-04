/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="EditorState.ts" />
/// <reference path="Interactable.ts" />
/// <reference path="EditingState.ts" />

class PlaceHolderState extends EditorState implements Interactable {
	public static _instance: PlaceHolderState = new PlaceHolderState();

	constructor() {
		super('placeholder');
	}

	public initState(editor: ContentEditor) {
		var $editor = editor.$el,
			placeHolderText = $editor.data('placeholder');

		super.initState(editor);

		$editor.empty();
		$('<p>', { text: placeHolderText }).appendTo($editor);
	}

	mousedown(editor: ContentEditor, e: JQueryEventObject) {
		var sel,
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

	keydown(editor: ContentEditor, e: JQueryEventObject) {
		var $editor = editor.$el;

		if (editor.isKeyForbidden(this.stateName, e)) return;

		$editor.find(':first-child').text('');
		$editor.removeClass('is-placeholder');

		editor.changeState(EditingState._instance);
	}
}
