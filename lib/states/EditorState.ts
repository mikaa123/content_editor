/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="../ContentEditor.ts" />
/// <reference path="states.d.ts" />

class EditorState implements Interactable {
	stateClass: string;

	constructor(public stateName: string, public editor: ContentEditor) {
		this.stateClass = 'is-' + this.stateName;
	}

	public initState() {
		this.editor.$el.addClass(this.stateClass);
	}

	public keydown(e: JQueryEventObject) {
		if (!this.isTypingAllowed(e)) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		this.handle(e);;
	}

	public mousedown(e: JQueryEventObject) {
		this.handle(e);
	}

	public blur(e: JQueryEventObject) {
		this.handle(e);
	}

	public handle(e: JQueryEventObject) {
		var handler = this[e.type + 'Handler'];
		handler && handler.call(this, e);
	}

	private isTypingAllowed(e: JQueryEventObject): boolean {
		var editor = this.editor,
			options = editor.options,
			isKeyForbidden = this.isKeyForbidden(e);

		if (!options.maxLength) {
			return !isKeyForbidden;
		}

		return !isKeyForbidden && editor.length() <= options.maxLength ||
			e.which === 8;
	}

	private isKeyForbidden(e: JQueryEventObject): boolean {
		return false;
	}
}
