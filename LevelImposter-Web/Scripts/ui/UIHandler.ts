﻿import { CardHandler } from '../cards/CardHandler.js';
import { ItemDBHandler } from './ItemDBHandler.js';
import { NameHandler } from './NameHandler.js';
import { PanelToggleHandler } from './PanelToggleHandler.js';
import { ToolbarHandler } from './ToolbarHandler.js';

export class UIHandler {
	name: NameHandler;
	item: ItemDBHandler;
	toolbar: ToolbarHandler;
	panel: PanelToggleHandler;
	cards: CardHandler;

	canvasFocused: boolean;

	constructor() {
		$("body").addClass("no-overflow");
		window.onbeforeunload = () => {
			return "";
		};
		$("body").click((e) => {
			this.canvasFocused = e.target.id == "licanvas";
		});

		this.name = new NameHandler();
		this.item = new ItemDBHandler();
		this.toolbar = new ToolbarHandler();
		this.panel = new PanelToggleHandler();
		this.cards = new CardHandler();
	}
}