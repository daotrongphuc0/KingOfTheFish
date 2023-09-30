import { Container, Sprite, Texture, Ticker, Graphics } from "pixi.js";
import { manifest } from "../gameload/assets";
import { Game } from "../game";
import { Helper } from "../helper/Helper";

export class BigFish extends Container {
    constructor(x, y, x_bg, y_bg, bg_width, bg_height) {
        super();
        this.isActive = true
        this.x = x
        this.y = y
        this.x_bg = x_bg
        this.y_bg = y_bg
        this.bg_width = bg_width
        this.bg_height = bg_height

        //const
        this.zIndex = 20
        this.chasing_distance = 300
        this.default_timeLoopAngry = 5000
        this.chase_time = 1000
        this.default_timeLoopRandom = 3000
        this.speed_angry = 2.5
        this.default_speed = 1

        // var
        this.speed = this.default_speed
        this.angry = 0
        this.time_angry = 0
        this.timeLoopRamdom = this.default_timeLoopRandom


        const bigFishBundle = manifest.bundles.find(bundle => bundle.name === 'bigFish'); // Tìm bundle 'bigFish'
        const texture = Texture.from(bigFishBundle.assets['bigFish01']); // Lấy đường dẫn của texture 'bigFish01' từ assets
        this.fish = new Sprite(texture);
        this.fish.anchor.set(0.5)
        this.fish.scale.set(1)
        this.fish.x = this.fish.width / 2
        this.fish.y = this.fish.height / 2
        this.addChild(this.fish)


        this.container = new Graphics()
        this.container.x = 0
        this.container.y = 0
        this.container.beginFill('0xFFFFFF')
        this.container.drawRect(-this.fish.width / 2 * 0.6, -this.fish.height / 2 * 0.3,
            this.fish.width * 0.75, this.fish.height * 0.4)
        this.container.endFill()
        this.container.alpha = 0
        this.fish.addChild(this.container)

        this.goLeft = true;
        this.goRight = false;
        this.goDown = false;
        this.goUp = false;
        this.currentTime = 0;

        this.randomDirection()

        Ticker.shared.add(this.update, this);


    }

    update(deltaTime) {
        if (!Game.isPause) {
            if (this.goLeft) {
                this.fish.scale.x = -1
                this.x = this.x - (this.speed * deltaTime);
                if (this.x + this.fish.width < 0) this.x = this.bg_width
            }

            if (this.goRight) {
                this.fish.scale.x = 1
                this.x = this.x + (this.speed * deltaTime);
                if (this.x > this.bg_width) this.x = - this.fish.width
            }

            if (this.goUp) {
                this.y = this.y - (this.speed * deltaTime);
                if (this.y < this.y_bg - this.fish.height) this.y = this.bg_height
            }

            if (this.goDown) {
                this.y = this.y + (this.speed * deltaTime);
                if (this.y > this.bg_height) this.y = 0 - this.fish.height + this.y_bg
            }

            if (this.angry) {
                if (this.time_angry < this.default_timeLoopAngry - this.chase_time) {
                    this.speed = this.default_speed
                    if (this.time_angry < 0) {
                        this.angry = false
                    }
                }

            } else {
                if (this.timeLoopRamdom <= 0) {
                    this.randomDirection()
                    this.timeLoopRamdom = this.defaut_timeLoopRandom;
                } else {
                    this.timeLoopRamdom -= Ticker.shared.deltaMS
                }
            }

            this.time_angry -= Ticker.shared.deltaMS
        }
    }

    randomDirection() {
        var randomNumberX = Helper.randomFloor(0, 3)
        var randomNumberY = Helper.randomFloor(0, 3)
        if (randomNumberY === 0 && randomNumberX == 0) randomNumberX = 1
        switch (randomNumberX) {
            case 0:
                this.goRight = false
                this.goLeft = false
                break
            case 1:
                this.goRight = true
                this.goLeft = false
                break
            case 2:
                this.goRight = false
                this.goLeft = true
                break
        }

        switch (randomNumberY) {
            case 0:
                this.goDown = false
                this.goUp = false
                break
            case 1:
                this.goDown = true
                this.goUp = false
                break
            case 2:
                this.goDown = false
                this.goUp = true
                break
        }

    }

    checkLocation(obj) {
        var kc = Math.sqrt(Math.pow(obj.x - this.x, 2)
            + Math.pow(obj.y - this.y, 2))
        //console.log(kc)
        if (kc < this.chasing_distance && this.time_angry < 0) {
            this.angry = true
            this.time_angry = this.default_timeLoopAngry
            this.speed = this.speed_angry
            if (obj.x < this.x) {
                this.goLeft = true
                this.goRight = false
            } else {
                this.goLeft = false
                this.goRight = true
            }

            if (obj.y < this.y) {
                this.goUp = true
                this.goDown = false
            } else {
                this.goUp = false
                this.goDown = true
            }

        }
    }

    destroy() {
        // Hủy đăng ký cập nhật
        Ticker.shared.remove(this.update, this);
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy();
    }

}
