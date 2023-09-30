import { Application, Assets, Ticker, Container } from "pixi.js";
import { LoadGame } from "./gameload/loadgame";
import dataGame from "../assets/jsondata/dataGame.json";
import { GameMenu } from "./Scene/gameMenu";


export class Game {
    static isPause = false
    static time = 0
    static init() {
        this.app = new Application({
            width: dataGame.game.width,
            height: dataGame.game.height,
            backgroundColor: dataGame.game.backgroundColor,
        });

        document.body.appendChild(this.app.view);
        this.gameRun = 1
        this.current_scene = new LoadGame()
        this.mainContainer = new Container()
        this.mainContainer.x = 0
        this.mainContainer.y = 0

        this.app.stage.addChild(this.mainContainer)
        this.mainContainer.addChild(this.current_scene)
    }

    static chanceScene(scene) {
        if (this.current_scene) {
            this.current_scene.destroy();
            this.mainContainer.removeChild(this.current_scene);
        }
        this.mainContainer.addChild(scene);
        this.current_scene = scene;
    }

    static finishLoad() {
        if (this.current_scene) {
            this.current_scene.destroy();
            this.mainContainer.removeChild(this.current_scene);
        }
        this.current_scene = new GameMenu()
        this.mainContainer.addChild(this.current_scene)

    }

    static resetTime() {
        this.time = 0
    }

    static get_time() {
        // Lấy giá trị phút và giây
        var minutes = Math.floor(Game.time / 60000);
        var seconds = Math.floor((Game.time % 60000) / 1000);

        // Định dạng lại giá trị phút và giây thành hai chữ số
        var formattedMinutes = ("0" + minutes).slice(-2);
        var formattedSeconds = ("0" + seconds).slice(-2);

        // Tạo đối tượng Text với giá trị đã định dạng
        return formattedMinutes + ':' + formattedSeconds
    }

}

window.onload = function () {
    Game.init();
}
