import { AnimatedSprite, Assets, Container, Graphics, Texture, Ticker } from "pixi.js";
import { manifest } from "../gameload/assets";
import { Game } from "../game";
export class Fish extends Container {
    constructor(x, y, x_bg, y_bg, bg_width, bg_height) {
        super();
        this.x_bg = x_bg
        this.y_bg = y_bg
        this.bg_width = bg_width
        this.bg_height = bg_height
        this.zIndex = 30

        this.x = x
        this.y = y

        this.speed = 5
        this.goLeft = false;
        this.goRight = false;
        this.goDown = false;
        this.goUp = false;



        const mainFishBundle = manifest.bundles.find(bundle => bundle.name === 'mainFish'); // Tìm bundle 'mainFish'
        const mainFishTextures = mainFishBundle.assets.map(asset => Texture.from(asset.srcs)); // Tạo mảng textures từ danh sách assets
        this.animated = new AnimatedSprite(mainFishTextures);
        this.animated.anchor.set(0.5)
        this.animated.x = this.animated.width / 2
        this.animated.y = this.animated.height / 2
        this.addChild(this.animated)
        this.animated.play();
        this.animated.animationSpeed = 0.1;

        this.container = new Graphics()
        this.container.x = 0
        this.container.y = 0
        this.container.beginFill('0xFFFFFF')
        this.container.drawRect(-this.animated.width / 2 * 0.6, -this.animated.height / 2 * 0.6, this.animated.width * 0.8, this.animated.height * 0.6)
        this.container.endFill()
        this.container.alpha = 0
        this.animated.addChild(this.container)



        this.animated.scale.set(0.5)

        Ticker.shared.add(this.update, this);

        window.addEventListener("keydown", this.onKeyDown.bind(this))
        window.addEventListener("keyup", this.onKeyUp.bind(this))
    }

    update(deltaTime) {
        if (!Game.isPause) {

            if (this.goLeft) {
                this.animated.scale.x = -0.5
                this.x = Math.max(this.x - (this.speed * deltaTime), - (this.animated.width / 2));
            }

            if (this.goRight) {
                this.animated.scale.x = 0.5
                this.x = Math.min(this.x + (this.speed * deltaTime), this.bg_width - this.animated.width * 1.5);
            }

            if (this.goUp) {
                this.y = Math.max(this.y - (this.speed * deltaTime), this.y_bg - this.animated.height / 2);
            }

            if (this.goDown) {
                this.y = Math.min(this.y + (this.speed * deltaTime), this.bg_height - this.animated.height / 2 - this.y_bg / 2);
            }
        }
    }



    onKeyDown(event) {
        //console.log(this.animated.position)
        switch (event.keyCode) {
            case 37:
                this.goLeft = true
                break
            case 38:
                this.goUp = true
                break
            case 39:
                this.goRight = true
                break
            case 40:
                this.goDown = true
                break
        }
    }

    onKeyUp(event) {

        switch (event.keyCode) {
            case 37:
                this.goLeft = false
                break
            case 38:
                this.goUp = false
                break
            case 39:
                this.goRight = false
                break
            case 40:
                this.goDown = false
                break
        }
    }

    destroy() {

        Ticker.shared.remove(this.update, this);
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy();
    }

}