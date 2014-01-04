/**
 * Created by michaelsokol on 28/12/2013.
 */

/// <reference path="libs/jquery.d.ts" />
/// <reference path="states/EditingState.ts" />
/// <reference path="states/PlaceHolderState.ts" />

class ContentEditor {
	private state: EditorState;

	public $el: JQuery;

	private placeHolderText: string;

	/**
	 * A hash mapping state names to forbidden key checking functions.
	 */
	private forbiddenKeyFnForState: {
		[stateName: string]: (e: JQueryEventObject) => boolean
	} = {};

	constructor(public el: HTMLElement) {
		this.$el = $(el);

		if (!this.$el.length) throw 'No DOM element found.';

		this.placeHolderText = this.$el.data('placeholder');

		if (this.placeHolderText && this.placeHolderText.length) {
			this.changeState(PlaceHolderState._instance);
		} else {
			this.changeState(EditingState._instance);
		}

		this.initListeners();
	}

	public changeState(state: EditorState) {
		this.state = state;
		state.initState(this);
	}

	public addForbiddenKeyFn(stateName: string, fn: (e: JQueryEventObject) => boolean) {
		this.forbiddenKeyFnForState[stateName] = fn;
	}

	private initListeners() {
		// Depending in the state, different things will be done.
		this.$el.on('mousedown blur keydown keyup', e => {
			var stateHandler = this.state[e.type];
			stateHandler && stateHandler.call(this.state, this, e);
		});
	}

	public isKeyForbidden(stateName: string, e: JQueryEventObject) {
		return this.forbiddenKeyFnForState[stateName](e);
	}
}
