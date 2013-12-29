/**
 * Created by michaelsokol on 28/12/2013.
 */

/// <reference path="libs/jquery.d.ts" />

enum EditorStates {
	PLACEHOLDER,
	EDITOR
}

class ContentEditor {
	private state: EditorStates = EditorStates.EDITOR;

	private $el: JQuery;

	private placeHolderText: string;

	constructor(public el: HTMLElement) {
		this.$el = $(el);

		if (!this.$el.length) throw 'No DOM element found.';

		this.placeHolderText = this.$el.data('placeholder');

		if (this.placeHolderText && this.placeHolderText) {
			this.showPlaceholder();
		}
	}

	private showPlaceholder () {
		this.state = EditorStates.PLACEHOLDER;
		this.$el.addClass('is-placeholder');
		$('<p/>', {
			text: this.placeHolderText
		}).appendTo(this.$el);
	}
}
