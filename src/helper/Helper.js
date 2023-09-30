
export class Helper {
    static randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomFloor(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    static getScreenWidth() {
        return window.innerWidth
    }

    static getScreenHeight() {
        return window.innerHeight
    }
}