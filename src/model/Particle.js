import { Container } from 'pixi.js';
import confetti from "canvas-confetti";
import { Helper } from '../helper/Helper';
import data from "../../assets/jsondata/dataGame.json"

export class ParticleEffect extends Container {
    constructor() {
        super();

        this.duration = 15 * 1000;
        this.animationEnd = Date.now() + this.duration;
        this.defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        this.interval = setInterval(() => {
            this.update();
        }, 250);
    }

    update() {
        var timeLeft = this.animationEnd - Date.now();

        if (timeLeft <= 0) {
            this.destroy();
            return;
        }

        var particleCount = 50 * (timeLeft / this.duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, this.defaults, {
                particleCount,
                origin: {
                    x: Helper.randomInRange((data.game.width / window.innerWidth) / 4 * 0.9, (data.game.width / window.innerWidth) / 4 * 1.1),
                    y: Math.random() * data.game.height / window.innerHeight * 0.8
                },
            })
        );
        confetti(
            Object.assign({}, this.defaults, {
                particleCount,
                origin: {
                    x: Helper.randomInRange(data.game.width / window.innerWidth * 3 / 4 * 0.8, data.game.width / window.innerWidth * 3 / 4),
                    y: Math.random() * data.game.height / window.innerHeight * 0.8
                },
            })
        );
    }

    destroy() {
        clearInterval(this.interval);
        while (this.children.length > 0) {
            this.children[0].destroy()
            this.removeChild(this.children[0]);
        }
        super.destroy();
    }
}
