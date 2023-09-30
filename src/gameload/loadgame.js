import { Container, Graphics, Assets, TextStyle, Text } from "pixi.js";
import dataGame from "../../assets/jsondata/dataGame.json"
import { manifest } from "./assets";
import { Game } from "../game"

export class LoadGame extends Container {
    constructor() {
        super()

        this.background = new Graphics()
        this.background.beginFill('0x0a9492')
        this.background.x = 0
        this.background.y = 0
        this.background.drawRect(0, 0, dataGame.game.width, dataGame.game.height)
        this.background.endFill()
        this.addChild(this.background)

        const style = new TextStyle({
            fill: "#d51010",
            fillGradientStops: [
                0
            ],
            fontSize: 50,
            fontStyle: "oblique",
            fontWeight: 900
        });
        this.text = new Text('Game loading...', style);
        this.text.anchor.set(0.5)
        this.text.x = this.background.width / 2
        this.text.y = this.background.height / 2
        this.addChild(this.text)

        this.init().then(() => {
            setTimeout(() => {
                Game.finishLoad()
                this.destroy()
            }, 1000)
        })

    }
    async init() {
        await Assets.init({ manifest: manifest })

        const bundleIds = manifest.bundles.map(bundle => bundle.name);

        await Assets.loadBundle(bundleIds);
        console.log('load xong')
    }
}