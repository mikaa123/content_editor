/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="../ContentEditor.ts" />
/// <reference path="states.d.ts" />

interface Interactable {
	mousedownHandler?(e: JQueryEventObject): void;
	keydownHandler?(e: JQueryEventObject): void;
	blurHandler?(e: JQueryEventObject): void;
}
