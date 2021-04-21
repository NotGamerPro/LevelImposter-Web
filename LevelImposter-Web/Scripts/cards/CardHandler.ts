﻿import { Object } from "../models/Object.js";
import { AdminGenerator } from "./AdminGenerator.js";
import { CamGenerator } from "./CamGenerator.js";
import { CardHelper } from "./CardHelper.js";
import { ColliderGenerator } from "./ColliderGenerator.js";
import { RoomGenerator } from "./RoomGenerator.js";
import { TaskGenerator } from "./TaskGenerator.js";
import { TransformGenerator } from "./TransformGenerator.js";
import { VentGenerator } from "./VentGenerator.js";

export class CardHandler {
	transformGen: TransformGenerator;
	colliderGen: ColliderGenerator;
	roomGen: RoomGenerator;
	adminGen: AdminGenerator;
	taskGen: TaskGenerator;
	ventGen: VentGenerator;
	camGen: CamGenerator;

	constructor() {
		this.transformGen = new TransformGenerator();
		this.colliderGen = new ColliderGenerator();
		this.roomGen = new RoomGenerator();
		this.adminGen = new AdminGenerator();
		this.taskGen = new TaskGenerator();
		this.ventGen = new VentGenerator();
		this.camGen = new CamGenerator();
	}

	load(obj: Object) {
		this.clear();

		// Cards
		this.transformGen.generate(obj);
		this.roomGen.generate(obj);
		this.adminGen.generate(obj);
		this.taskGen.generate(obj);
		this.colliderGen.generate(obj);
		this.ventGen.generate(obj);
		this.camGen.generate(obj);

		// Bottom Buttons
		let colliderButton = CardHelper.genBottomButton("Add Collider");
		colliderButton.onclick = obj.addCollider.bind(obj);
		CardHelper.append(colliderButton);
	}

	clear() {
		$("#prop-name").empty();
		$("#prop-list").empty();
		$("#trash").prop("disabled", true);
	}
}