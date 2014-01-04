/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="../ContentEditor.ts" />

class EditorState {
	stateClass: string;

	public initState(editor: ContentEditor) {
		editor.$el.addClass(this.stateClass);
	}
}
