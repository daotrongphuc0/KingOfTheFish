import { Graphics, TextStyle, Text } from "pixi.js";
import data from "../../assets/jsondata/dataGame.json"
import TWEEN from "@tweenjs/tween.js";


export class BeginLevel extends Graphics {
    constructor(text) {
        super()
        this.x = 0
        this.y = 0

        this.sortableChildren = true


        var startTextStyle = new TextStyle({
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
        this.startText = new Text('Start', startTextStyle);

        // Đặt vị trí của chữ "Start"
        this.startText.x = data.game.width / 2 - this.startText.width / 2;
        this.startText.y = data.game.height / 2 - this.startText.height;
        this.startText.zIndex = 5
        this.addChild(this.startText)

        // Tạo một đối tượng TextStyle cho chữ "Level 1"
        var levelTextStyle = new TextStyle({
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
        this.levelText = new Text(text, levelTextStyle);

        // Đặt vị trí của chữ "Level"
        this.levelText.x = data.game.width / 2 - this.levelText.width / 2;
        this.levelText.y = data.game.height / 2 - this.levelText.height + 60;
        this.levelText.zIndex = 6
        this.addChild(this.levelText)

        this.graphics = new Graphics()
        this.graphics.beginFill('0xFFFFFF')
        this.graphics.drawRect(0, data.game.height / 2 - 170, data.game.width, this.startText.height + this.levelText.height + 50)
        this.graphics.alpha = 0.5
        this.graphics.zIndex = 1
        this.graphics.endFill()
        this.addChild(this.graphics)
        this.run()
    }

    run() {
        this.startText.x = -this.startText.width; // Vị trí ban đầu của chữ "Start" bên trái
        const endX = data.game.width / 2 - this.startText.width / 2; // Vị trí kết thúc của chữ "Start"
        const duration = 1000; // Thời gian di chuyển

        // Tạo tween cho chữ "Start"
        const startTextTween = new TWEEN.Tween(this.startText)
            .to({ x: endX }, duration)
            .easing(TWEEN.Easing.Linear.None) // Có thể thay đổi kiểu easing theo ý muốn
            .start();

        this.levelText.x = data.game.width; // Vị trí ban đầu của chữ "Level" bên phải
        const levelEndX = data.game.width / 2 - this.levelText.width / 2; // Vị trí kết thúc của chữ "Level"

        // Tạo tween cho chữ "Level"
        const levelTextTween = new TWEEN.Tween(this.levelText)
            .to({ x: levelEndX }, duration)
            .easing(TWEEN.Easing.Linear.None) // Có thể thay đổi kiểu easing theo ý muốn
            .start();

        this.animate()
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        TWEEN.update();
    }

    destroy() {
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy();
    }

}
