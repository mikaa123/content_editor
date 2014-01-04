/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="../ContentEditor.ts" />

class EditorState {
	stateClass: string;
	stateName: string;

	constructor(stateName: string) {
		this.stateName = 'placeholder';
		this.stateClass = 'is-' + this.stateName;
	}

	public initState(editor: ContentEditor) {
		editor.$el.addClass(this.stateClass);
	}
}
