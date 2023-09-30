import { Container, Ticker, Graphics, Text, TextStyle } from "pixi.js";
import { Fish } from "../model/mainFish";
import { SmallFish } from "../model/SmallFish";
import { BigFish } from "../model/BigFish"
import data from "../../assets/jsondata/dataLv1.json"
import { Bg } from "../model/bg";
import { Game } from "../game";
import dataGame from "../../assets/jsondata/dataGame.json"
import { GameOver } from "./gameOver";
import { BeginLevel } from "../model/Begin_level";
import { GameRunLv2 } from "./gamerunlv2";
import { GameWin } from "./GameWin";
import { SoundManager } from "../helper/Sound";
import { Pause } from "../model/pause";
import { Collision } from "../helper/Collision";
import { Helper } from "../helper/Helper";


export class GameRun extends Container {
    constructor(nextLevel = true) {
        //super
        SoundManager.play_game()
        super()
        this.x = 0
        this.y = 0
        this.score = 0
        this.score_increase = data.game_bg.score_increase
        this.time = 0
        this.width = dataGame.game.width
        this.height = dataGame.game.height
        this.sortableChildren = true
        this.nextLevel = nextLevel
        this.quantity_fish = data.game_bg.limit_small_fish

        // background
        this.bg = new Bg(0, 50)
        this.bg.zIndex = 0
        this.addChild(this.bg);

        // scen begin level
        this.begin_game = new BeginLevel('level 1')
        this.bg.addChild(this.begin_game)

        // đợi hiển thị 
        setTimeout(() => {
            this.bg.removeChild(this > this.begin_game)
            this.begin_game.destroy()
            this.init_game()
        }, 3000)
    }

    // tiếp tục contructor
    init_game() {
        // add player
        this.fish = new Fish(data.mainFish.x, data.mainFish.y, data.game_bg.x_bg, data.game_bg.y_bg,
            data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
        this.addChild(this.fish)

        // add list small fish
        this.listSmallFish = []
        for (var i = 0; i < this.quantity_fish; i++) {
            var tmp = new SmallFish(data.smallFish[i].x, data.smallFish[i].y, data.game_bg.x_bg, data.game_bg.y_bg,
                data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
            this.listSmallFish.push(tmp)
            this.addChild(tmp)
        }

        // add list big fish
        this.listBigFish = []
        for (var i = 0; i < data.bigFish.length; i++) {
            var tmp = new BigFish(data.bigFish[i].x, data.bigFish[i].y, data.game_bg.x_bg, data.game_bg.y_bg,
                data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
            this.listBigFish.push(tmp)
            this.addChild(tmp)
        }

        // thanh điểm và thời gian
        this.header = new Container()
        this.header.x = 0
        this.header.y = 0
        this.score_bg = new Graphics()
        this.score_bg.beginFill('0xFFFFFF')
        this.score_bg.drawRect(0, 0, data.game_bg.width, 50)
        this.score_bg.endFill()
        this.header.addChild(this.score_bg)

        // score
        const style = new TextStyle({
            fontFamily: "Comic Sans MS",
            fontSize: 42,
            fontVariant: "small-caps",
            fontWeight: 500
        });
        this.text_score_name = new Text('score:', style);
        this.header.addChild(this.text_score_name)
        this.text_score = new Text(this.score + '/100', style);
        this.text_score.anchor.set(1, 0)
        this.text_score.x = 275
        this.header.addChild(this.text_score)

        //time
        this.text_time_name = new Text('Time:', style);
        this.text_time_name.x = 900
        this.header.addChild(this.text_time_name)
        this.text_time = new Text('00:00', style);
        this.text_time.x = 1020
        this.header.addChild(this.text_time)
        this.header.zIndex = 100
        this.addChild(this.header)

        // game pause
        this.pause = new Pause()
        window.addEventListener('keydown', this.keypause.bind(this))

        Ticker.shared.add(this.update, this)
    }

    keypause(event) {
        if (event.keyCode == 32) {
            console.log('pause')
            Game.isPause = !Game.isPause
            if (Game.isPause) {
                this.addChild(this.pause)
            } else {
                this.removeChild(this.pause)
            }
        }
    }

    update(deltaTime) {
        if (!Game.isPause) {
            for (var i = 0; i < this.listSmallFish.length; i++) {
                if (this.listSmallFish[i].isActive) {
                    this.listSmallFish[i].checkLocation(this.fish)

                    if (Collision.checkCollision(this.fish.container, this.listSmallFish[i].container)) {
                        SoundManager.play_eat()
                        var tmp = this.listSmallFish[i]
                        this.listSmallFish[i].isActive = false
                        this.listSmallFish.splice(i, 1)
                        this.removeChild(tmp)

                        console.log("destroy fish")
                        this.score += this.score_increase
                        this.text_score.text = this.score + '/100'
                        tmp.destroy()
                        this.add_small_fish()
                        if (this.score >= 100) {
                            if (this.nextLevel) {
                                Game.chanceScene(new GameRunLv2())
                            } else {
                                SoundManager.stop_game()
                                Game.chanceScene(new GameWin())
                            }
                        }
                    }

                }
            }

            for (var i = 0; i < this.listBigFish.length; i++) {
                this.listBigFish[i].checkLocation(this.fish)
                if (Collision.checkCollision(this.fish.container, this.listBigFish[i].container)) {
                    SoundManager.stop_game()
                    Game.chanceScene(new GameOver());
                }
            }

            // update time game
            Game.time += Ticker.shared.deltaMS
            this.text_time.text = Game.get_time()
        }
        else {
            return
        }

    }

    add_small_fish() {
        if (this.quantity_fish >= data.smallFish.length) return
        var number = Helper.randomFloor(0, 4)
        var tmp = new SmallFish(data.smallFish[this.quantity_fish].x, data.smallFish[this.quantity_fish].y, data.game_bg.x_bg,
            data.game_bg.y_bg, data.game_bg.width - data.game_bg.x_bg, data.game_bg.height - data.game_bg.y_bg)
        //this.tmp.set_zIndex(10)
        switch (number) {
            case 0:
                tmp.x = - tmp.width
                break
            case 1:
                tmp.x = tmp.bg_width + tmp.width
                break
            case 2:
                tmp.y = tmp.y_bg - tmp.height
                break
            case 3:
                tmp.y = tmp.bg_height + tmp.height + tmp.y_bg
                break
        }
        this.listSmallFish.push(tmp)

        this.addChild(tmp)
        this.quantity_fish += 1

    }

    destroy() {
        this.listSmallFish = []
        this.listBigFish = []
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }

        Ticker.shared.remove(this.update, this);
        super.destroy();
    }
}