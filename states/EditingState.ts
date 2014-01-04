/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="EditorState.ts" />
/// <reference path="Interactable.ts" />
/// <reference path="../ContentEditor.ts" />

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

	mousedown(editor: ContentEditor, e: JQueryEventObject):void {
		alert("hey!");
	}

	keydown(editor: ContentEditor, e: JQueryEventObject):void {
		alert("ho!");
	}
}
