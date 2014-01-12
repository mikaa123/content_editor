/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="EditorState.ts" />
/// <reference path="states.d.ts" />

class EditingState extends EditorState {

	constructor(editor: ContentEditor) {
		super('editing', editor);
	}

	public initState(editor: ContentEditor) {
		super.initState(editor);
	}

	blur(e: JQueryEventObject): void {
		if (!this.editor.$el.text().length) {
			this.editor.changeState('placeholder');
		}
	}
}
