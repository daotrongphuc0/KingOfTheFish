import { Container, Graphics, Text, TextStyle } from "pixi.js";
import data from "../../assets/jsondata/dataGame.json"

export class Pause extends Container {
    constructor() {
        super()
        this.zIndex = 1001
        this.graphics = new Graphics()
        this.graphics.beginFill('0xFFFFFF')
        this.graphics.drawRect(0, 0, data.game.width, data.game.height)
        this.graphics.alpha = 0.5
        this.graphics.endFill()
        this.addChild(this.graphics)

        const style = new TextStyle({
            fill: "#f90b0b",
            fillGradientStops: [
                0
            ],
            fontSize: 100,
            fontVariant: "small-caps",
            fontWeight: 900
        });
        this.text = new Text('Pause', style);
        this.text.anchor.set(0.5)
        this.text.x = data.game.width / 2
        this.text.y = data.game.height / 2
        this.addChild(this.text)
    }
    destroy() {
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy();
    }
}