/**
 * Created by michaelsokol on 28/12/2013.
 */

/// <reference path="libs/jquery.d.ts" />
/// <reference path="editor_states.ts" />

class ContentEditor {
	private state: EditorState;

	private $el: JQuery;

	private placeHolderText: string;

	constructor(public el: HTMLElement) {
		this.$el = $(el);

		if (!this.$el.length) throw 'No DOM element found.';

		this.placeHolderText = this.$el.data('placeholder');

		if (this.placeHolderText && this.placeHolderText) {
			this.showPlaceholder();
		}

		// Create bindings.
		// What do i wanna bind?
		// - mousedown
		// - blur -> To show the placeholder
		// - keydown
		// - keyup

		// Create states.

		// Depending in the state, different things will be done.
		this.$el.on('mousedown blur keydown keyup', e => {
			var stateHandler = this.state[e.type];
			stateHandler && stateHandler(this);
		});
	}

	private showPlaceholder () {
		this.state = EditorStates.PLACEHOLDER;
		this.$el.addClass('is-placeholder');
		$('<p/>', {
			text: this.placeHolderText
		}).appendTo(this.$el);
	}
}
