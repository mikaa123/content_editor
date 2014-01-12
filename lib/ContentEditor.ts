/**
 * Created by michaelsokol on 28/12/2013.
 */

/// <reference path="libs/jquery.d.ts" />
/// <reference path="states/states.d.ts" />

/***
 * A mode-oriented base class for building mode-oriented editors.
 * In essence, it's mainly an implementation of the State pattern [1] applied to content-editable elements.
 *
 * [1]: (http://en.wikipedia.org/wiki/State_pattern)
 *
 * @class
 */
class ContentEditor {
	private state: EditorState;
	private placeHolderText: string;
	public $el: JQuery;

	/**
	 * A hash mapping state names to forbidden key checking functions.
	 */
	private forbiddenKeyFnForState: {
		[stateName: string]: (e: JQueryEventObject) => boolean
	} = {};

	/**
	 * Holds all the state instances for the editor.
	 */
	private statesMap: {
		[stateName: string]: EditorState
	}

	// TODO: Keyword - arguments?
	constructor(public el: HTMLElement, statesMap, public options?: {
		maxLength?: number;
		minLength?: number;
		allowEmpty?: boolean;
	}) {
		this.$el = $(el);
		this.statesMap = statesMap || {
			'placeholder': new PlaceHolderState(this),
			'editing': new EditingState(this)
		};

		if (!this.$el.length) throw 'No DOM element found.';
		this.placeHolderText = this.$el.data('placeholder');
		if (this.placeHolderText && this.placeHolderText.length) {
			this.changeState('placeholder');
		} else {
			this.changeState('editing');
		}

		this.initListeners();
	}

	/**
	 * State transition goes through this method, although it's the states themselves who
	 * know when to transition stateName.
	 *
	 * @param stateName
	 */
	public changeState(stateName: string) {
		if (!stateName || !this.statesMap[stateName]) {
			throw 'Undefined stateName';
		}

		this.state = this.statesMap[stateName];
		this.state.initState(this);
	}

	/**
	 * Each state is a Flyweight pattern (http://en.wikipedia.org/wiki/Flyweight_pattern),
	 * as a result, they can't hold an extrinsic state. In this case, the ContentEditor acts
	 * as a Context, and this is where instance-specific information concerning keyboard validation
	 * is stored.
	 *
	 * Each function returns a boolean indicating whether the key represented in the JQueryEventObject
	 * is forbidden.
	 *
	 * @param stateName
	 * @param fn
	 */
	public addForbiddenKeyFn(stateName: string, fn: (e: JQueryEventObject) => boolean) {
		this.forbiddenKeyFnForState[stateName] = fn;
	}

	/**
	 * Checks if the editor is valid according to the option hash passed to the constructor.
	 */
	public isValid(): {
		isValid: boolean;
		errors: string[];
	} {
		var textLength,
			validity = true,
			errors = [];

		if (!this.options) {
			return { isValid: true, errors: [] };
		}

		textLength = this.$el.text().length;
		if (this.options.maxLength && textLength > this.options.maxLength) {
			validity = false;
			errors.push('maxLength');
		}
		if (this.options.minLength && textLength <= this.options.minLength) {
			validity = false;
			errors.push('minLength');
		}
		if (!this.options.allowEmpty && this.state.stateName === 'placeholder' ||
			!this.options.allowEmpty && this.state.stateName !== 'placeholder' && !textLength) {
			validity = false;
			errors.push('allowEmpty');
		}

		return {
			isValid: validity,
			errors: errors
		};
	}

	public isKeyForbidden(stateName: string, e: JQueryEventObject): boolean {
		return this.forbiddenKeyFnForState[stateName] && this.forbiddenKeyFnForState[stateName](e);
	}

	public addState(stateName: string, state: EditorState) {
		this.statesMap[stateName] = state;
	}

	public setStateProperty(stateName: string, props) {
		var state = this.statesMap[stateName];
		if (!state) {
			state = new EditorState(stateName, this);
		}

		for (var prop in props) {
			if (props.hasOwnProperty(prop)) {
				state[prop] = props[prop];
			}
		}
	}

	public length(): number {
		return this.$el.text().length;
	}

	private initListeners() {
		this.$el.on('mousedown blur keydown keyup', e => {
			this.state[e.type] && this.state[e.type](e);
		});
	}
}
