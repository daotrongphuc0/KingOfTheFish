import { Container, Sprite, Text, TextStyle, Graphics, Texture } from "pixi.js";
import data from "../../assets/jsondata/dataGame.json"
import { manifest } from "../gameload/assets";
import { Bg } from "../model/bg"
import { ParticleEffect } from "../model/Particle";
import { Game } from "../game";
import { GameMenu } from "./gameMenu";


export class GameWin extends Container {
    constructor(name_img = 'bgGame') {
        super()

        this.x = 0
        this.y = 0

        this.bg = new Bg(0, 0, name_img)
        this.addChild(this.bg);

        this.sortableChildren = true

        var headTextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 126,
            fontWeight: 'bold',
            fill: ['#00bfff', '#0066cc'], // Gradient fill - màu xanh nước biển
            stroke: '#ffffff',
            strokeThickness: 6,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 10,
            dropShadowAngle: Math.PI / 4,
            dropShadowDistance: 6,
            fontStyle: 'italic', // Nghiêng chữ
        });

        // Tạo một đối tượng Text cho chữ "Start" với TextStyle tương ứng
        this.headText = new Text('You win', headTextStyle);

        // Đặt vị trí của chữ "Start"
        this.headText.x = data.game.width / 2 - this.headText.width / 2;
        this.headText.y = data.game.height / 2 - this.headText.height;
        this.headText.zIndex = 5
        this.addChild(this.headText)

        // Tạo một đối tượng TextStyle cho chữ "Level 1"
        var homeTextStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 52,
            fontWeight: 'bold',
            fill: ['#008080', '#0033cc'], // Gradient fill - màu xanh dương nước biển
            stroke: '#ffffff',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 6,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4,
            align: 'center',
            lineJoin: 'round',
            padding: 10,
        });

        // Tạo một đối tượng Text cho chữ "Level 1" với TextStyle tương ứng
        this.homeText = new Text("Time " + Game.get_time(), homeTextStyle);

        // Đặt vị trí của chữ "Level"
        this.homeText.x = data.game.width / 2 - this.homeText.width / 2;
        this.homeText.y = data.game.height / 2 - this.homeText.height + 60;
        this.homeText.zIndex = 6
        this.addChild(this.homeText)

        this.graphics = new Graphics()
        this.graphics.beginFill('0xFFFFFF')
        this.graphics.drawRect(0, data.game.height / 2 - 170, data.game.width, this.headText.height + this.homeText.height + 50)
        this.graphics.alpha = 0.5
        this.graphics.zIndex = 1
        this.graphics.endFill()
        this.addChild(this.graphics)

        const bg_manifest = manifest.bundles.find(bundle => bundle.name === 'background');
        const texture_item = Texture.from(bg_manifest.assets['item_home']);
        this.home_sprite = new Sprite(texture_item)
        this.home_sprite.scale.set(0.6)
        this.home_sprite.anchor.set(0.5)
        this.home_sprite.x = data.game.width / 2
        this.home_sprite.y = (data.game.height / 2) * 1.6
        this.addChild(this.home_sprite)

        this.home_sprite.interactive = true;
        this.home_sprite.on('pointerover', this.onPointerOver.bind(this.home_sprite));
        this.home_sprite.on('pointerout', this.onPointerOut.bind(this.home_sprite));
        this.home_sprite.on('click', this.onClickStart.bind(this.home_sprite))

        this.particle = new ParticleEffect()
        this.addChild(this.particle)
    }

    onPointerOver() {
        this.scale.set(0.7)
    }

    onPointerOut() {
        this.scale.set(0.6)
    }

    onClickStart() {
        Game.chanceScene(new GameMenu())
    }

    destroy() {
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy()
    }

}

