import { Container, Sprite, Texture, Ticker, Graphics } from "pixi.js";
import { manifest } from "../gameload/assets";
import { Game } from "../game";
import { Helper } from "../helper/Helper";

export class SmallFish extends Container {
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
        this.zIndex = 10
        this.run_distance = 300
        this.default_timeLoopDangerous = 5000
        this.run_time = 1000
        this.default_timeLoopRandom = 3000
        this.speed_dangerous = 3
        this.default_speed = 1

        // var
        this.speed = this.default_speed
        this.dangerous = 0
        this.time_dangerous = 0
        this.timeLoopRamdom = this.default_timeLoopRandom




        const smallFishBundle = manifest.bundles.find(bundle => bundle.name === 'smallFish'); // Tìm bundle 'bigFish'
        const texture = Texture.from(smallFishBundle.assets['smallFish01']); // Lấy đường dẫn của texture 'bigFish01' từ assets
        this.fish = new Sprite(texture)
        this.fish.anchor.set(0.5)
        this.fish.x = this.fish.width / 2
        this.fish.y = this.fish.height / 2
        this.addChild(this.fish)


        this.container = new Graphics()
        this.container.x = 0
        this.container.y = 0
        this.container.beginFill('0xFFFFFF')
        this.container.drawRect(-this.fish.width / 2 * 0.6, -this.fish.height / 2 * 0.65, this.fish.width * 0.6, this.fish.height * 0.5)
        this.container.endFill()
        this.container.alpha = 0
        this.fish.addChild(this.container)

        this.goLeft = false;
        this.goRight = false;
        this.goDown = false;
        this.goUp = true;
        this.currentTime = 0;

        this.randomDirection()

        this.fish.scale.set(0.8)


        Ticker.shared.add(this.update, this);


    }

    // set_zIndex(int) {
    //     this.zIndex = int
    // }

    update(deltaTime) {
        if (!Game.isPause) {
            if (this.goLeft) {
                this.fish.scale.x = 0.8
                this.x = this.x - (this.speed * deltaTime);
                if (this.x + this.fish.width < 0) this.x = this.bg_width
            }

            if (this.goRight) {
                this.fish.scale.x = -0.8
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

            if (this.dangerous) {
                if (this.time_dangerous < this.default_timeLoopDangerous - this.run_time) {
                    this.speed = this.default_speed
                    if (this.time_dangerous < 0) {
                        this.dangerous = false
                    }
                }

            } else {
                if (this.timeLoopRandom <= 0) {
                    this.randomDirection()
                    this.timeLoopRandom = this.default_timeLoopRandom;
                } else {
                    this.timeLoopRandom -= Ticker.shared.deltaMS
                }
            }

            this.time_dangerous -= Ticker.shared.deltaMS
        }

        //console.log(1000 / Ticker.shared.deltaMS);
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
        if (kc < this.run_distance && this.time_dangerous < 0) {
            this.dangerous = true
            this.time_dangerous = this.default_timeLoopDangerous
            this.speed = this.speed_dangerous
            if (obj.x > this.x) {
                this.goLeft = true
                this.goRight = false
            } else {
                this.goLeft = false
                this.goRight = true
            }

            if (obj.y > this.y) {
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
