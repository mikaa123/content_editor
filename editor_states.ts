/**
 * Created by michaelsokol on 29/12/2013.
 */

interface Interactable {
	mousedown(editor: ContentEditor, e: JQueryEventObject): void;
	keydown(editor: ContentEditor, e: JQueryEventObject): void;
}

class EditorState {
	stateClass: string;

	public initState(editor: ContentEditor) {
		editor.$el.addClass(this.stateClass);
	}
}

class PlaceHolderState extends EditorState implements Interactable {
	public static _instance: PlaceHolderState = new PlaceHolderState();

	constructor() {
		super();
		this.stateClass = 'is-placeholder';
	}

	public initState(editor: ContentEditor) {
		var $editor = editor.$el,
			placeHolderText = $editor.data('placeholder');

		super.initState(editor);

		$editor.empty();
		$('<p>', { text: placeHolderText }).appendTo($editor);
	}

	public mousedown(editor: ContentEditor, e: JQueryEventObject) {
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

	keydown(editor:ContentEditor, e:JQueryEventObject) {
		var $editor = editor.$el;
		$editor.find(':first-child').text('');
		$editor.removeClass('is-placeholder');

		editor.changeState(EditingState._instance);
	}
}

class EditingState extends EditorState implements Interactable {
	public static _instance: EditingState = new EditingState();

	constructor() {
		super();
		this.stateClass = 'is-editing';
	}


	public initState(editor: ContentEditor) {
		super.initState(editor);

		alert('is-editing!')
	}

	mousedown(editor:ContentEditor, e:JQueryEventObject):void {
		alert("hey!");
	}

	keydown(editor:ContentEditor, e:JQueryEventObject):void {
		alert("ho!");
	}
}
