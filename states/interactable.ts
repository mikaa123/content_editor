/**
 * Created by michaelsokol on 04/01/2014.
 */

/// <reference path="../ContentEditor.ts" />

interface Interactable {
	mousedown(editor: ContentEditor, e: JQueryEventObject): void;
	keydown(editor: ContentEditor, e: JQueryEventObject): void;
	blur?(editor: ContentEditor, e: JQueryEventObject): void;
}
