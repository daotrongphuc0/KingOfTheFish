import { Container, Sprite, TextStyle, Rectangle, Text, Texture, Graphics } from "pixi.js";
import dataGame from "../../assets/jsondata/dataGame.json"
import { Game } from "../game";
import { GameRun } from "./gamerun";
import { manifest } from "../gameload/assets";
import { GameOption } from "./gameOption";
import { SoundManager } from "../helper/Sound";
import { GameRunLv2 } from "./gamerunlv2";

export class GameMenu extends Container {
    constructor() {
        super()
        this.x = 0
        this.y = 0


        const bgGameMenu = manifest.bundles.find(bundle => bundle.name === 'background');
        const texture = Texture.from(bgGameMenu.assets['bgGameMenu']);
        this.bg = new Sprite(texture)
        this.bg.x = 0
        this.bg.y = 0
        this.bg.width = dataGame.game.width
        this.bg.height = dataGame.game.height
        this.addChild(this.bg)

        const style = new TextStyle({
            fontFamily: "Arial, sans-serif",
            fontSize: 75,
            fontWeight: "bold",
            fill: ["#ffcc00", "#ff6600"], // Gradient màu từ vàng đến cam
            stroke: "#333333", // Màu viền chữ
            strokeThickness: 3, // Độ dày viền chữ
            dropShadow: true, // Hiệu ứng bóng đổ
            dropShadowColor: "#000000", // Màu bóng đổ
            dropShadowBlur: 4, // Độ mờ bóng đổ
            dropShadowAngle: Math.PI / 4, // Góc bóng đổ
            dropShadowDistance: 4, // Khoảng cách bóng đổ
        });
        this.name_game = new Text('King of the fish', style);
        this.name_game.x = dataGame.game.width / 2 - this.name_game.width / 2
        this.name_game.y = dataGame.game.height * 0.2
        this.addChild(this.name_game)

        // cat chu start
        const bg_button_gamemenu = manifest.bundles.find(bundle => bundle.name === 'sprite');
        const texture_item = Texture.from(bg_button_gamemenu.assets['btn_play']);
        this.container_button = new Container()
        this.container_button.x = dataGame.game.width / 2
        this.container_button.y = dataGame.game.height / 2

        this.start_sprite = new Sprite(texture_item)
        this.start_sprite.scale.set(0.4)
        this.start_sprite.anchor.set(0.5)
        this.start_sprite.x = 0
        this.start_sprite.y = 0
        this.container_button.addChild(this.start_sprite)

        this.start_sprite.interactive = true;
        this.start_sprite.on('pointerover', this.onPointerOver.bind(this.start_sprite));
        this.start_sprite.on('pointerout', this.onPointerOut.bind(this.start_sprite));
        this.start_sprite.on('click', this.onClickStart.bind(this.start_sprite))


        this.option_sprite = new Sprite(Texture.from(bg_button_gamemenu.assets['btn_option']))
        this.option_sprite.scale.set(0.4)
        this.option_sprite.anchor.set(0.5)
        this.option_sprite.x = 0
        this.option_sprite.y = 160
        this.container_button.addChild(this.option_sprite)

        this.option_sprite.interactive = true;
        this.option_sprite.on('pointerover', this.onPointerOver.bind(this.option_sprite));
        this.option_sprite.on('pointerout', this.onPointerOut.bind(this.option_sprite));
        this.option_sprite.on('click', this.onclickOption.bind(this.option_sprite))

        this.addChild(this.container_button)

        this.challenge_sprite = new Sprite(Texture.from(bg_button_gamemenu.assets['btn_challenge']))
        this.challenge_sprite.scale.set(0.4)
        this.challenge_sprite.anchor.set(0.5)
        this.challenge_sprite.x = 0
        this.challenge_sprite.y = 80
        this.container_button.addChild(this.challenge_sprite)

        this.challenge_sprite.interactive = true;
        this.challenge_sprite.on('pointerover', this.onPointerOver.bind(this.challenge_sprite));
        this.challenge_sprite.on('pointerout', this.onPointerOut.bind(this.challenge_sprite));
        this.challenge_sprite.on('click', this.onClickChallenge.bind(this.challenge_sprite))

        this.addChild(this.container_button)

        SoundManager.play_home()
    }

    onPointerOver() {
        var scale_x = this.scale.x;
        var scale_y = this.scale.y;
        this.scale.set(scale_x + 0.05, scale_y + 0.05)
    }

    onPointerOut() {
        var scale_x = this.scale.x;
        var scale_y = this.scale.y;
        this.scale.set(scale_x - 0.05, scale_y - 0.05)
    }

    onClickStart() {
        Game.resetTime()
        SoundManager.stop_home()
        Game.chanceScene(new GameRun())
    }

    onclickOption() {
        Game.chanceScene(new GameOption())
    }

    onClickChallenge() {
        Game.resetTime()
        SoundManager.stop_home()
        Game.chanceScene(new GameRunLv2(false, true))
    }

    destroy() {
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy();
    }

}