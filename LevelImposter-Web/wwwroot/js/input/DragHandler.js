import { ColliderEditor } from "../map/ColliderEditor.js";
import { MapHandler } from "../map/MapHandler.js";
import { ActionHandler } from "./Actions/ActionHandler.js";
import { ChangeAction } from "./Actions/ChangeAction.js";
import { InputHandler } from "./InputHandler.js";
import { SelectHandler } from "./SelectHandler.js";
export class DragHandler {
    constructor() {
        this.isDragging = false;
        this.index = -1;
    }
    update() {
        if (SelectHandler.isSelected && InputHandler.mouse.left && !this.isDragging && !ColliderEditor.isEditing) {
            // Init Dragging
            let currentMouse = SelectHandler.cam.getMouse();
            let currentObj = SelectHandler.getSelection();
            this.dragInit = {
                x: currentObj.x - currentMouse.x,
                y: currentObj.y - currentMouse.y
            };
            this.index = SelectHandler.selectIndex;
            SelectHandler.freezeSelection = true;
            this.initialState = currentObj.clone();
            this.isDragging = true;
            InputHandler.mouse.setCursor("move");
        }
        else if (SelectHandler.isSelected && this.isDragging && InputHandler.mouse.left) {
            // Currently Dragging
            let currentMouse = SelectHandler.cam.getMouse();
            let currentObj = MapHandler.map.objs[this.index];
            currentObj.x = currentMouse.x + this.dragInit.x;
            currentObj.y = currentMouse.y + this.dragInit.y;
            InputHandler.ui.cards.transformGen.updateValues(currentObj);
        }
        else if (this.isDragging) {
            // End Dragging
            this.isDragging = false;
            SelectHandler.freezeSelection = false;
            InputHandler.mouse.setCursor("default");
            let currentObj = MapHandler.map.objs[this.index];
            let dist = Math.sqrt(Math.pow(this.initialState.x - currentObj.x, 2) + Math.pow(this.initialState.y - currentObj.y, 2));
            if (dist > 0)
                ActionHandler.add(new ChangeAction(this.initialState, currentObj));
        }
    }
}
//# sourceMappingURL=DragHandler.js.map