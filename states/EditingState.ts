/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="EditorState.ts" />
/// <reference path="Interactable.ts" />
/// <reference path="../ContentEditor.ts" />

class EditingState extends EditorState implements Interactable{
	public static _instance: EditingState = new EditingState();

	constructor() {
		super();
		this.stateClass = 'is-editing';
	}

	public initState(editor: ContentEditor) {
		super.initState(editor);
	}

	keydown(editor: ContentEditor, e: JQueryEventObject):void {
	}

	blur(editor: ContentEditor, e: JQueryEventObject):void {
		if (!editor.$el.text().length) {
			editor.changeState(PlaceHolderState._instance);
		}
	}
}
