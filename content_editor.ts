/**
 * Created by michaelsokol on 28/12/2013.
 */

/// <reference path="libs/jquery.d.ts" />

/**
 * This holds the different states a ContentEditor can be in.
 */
enum EditorStates {
	PLACEHOLDER,
	EDITOR
}

class ContentEditor {
	private state: EditorStates;

	// The ContentEditor's DOM element.
	private $el: JQuery;

	constructor(public el: HTMLElement) {
		var placeholderText: string;

		this.$el = $(el);

		placeholderText = this.$el.data('placeholder');

		if (placeholderText && placeholderText.length) {
			this.state = EditorStates.PLACEHOLDER;
			this.$el.addClass('is-placeholder');
			$('<p/>', {
				text: placeholderText
			}).appendTo(this.$el);
		}
	}
}
