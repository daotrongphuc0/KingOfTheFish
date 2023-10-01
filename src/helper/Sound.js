import { sound } from '@pixi/sound';

export class SoundManager {

    static sound_game = false
    static sound_home = false
    constructor() {
        this.volume = 0.5
    }

    static play_eat() {
        sound.play('sound_eat', { loop: false, volume: 1 })
    }

    static play_game() {
        if (!this.sound_game) {
            sound.play('sound_game', { loop: true, volume: 0.5, start: 0 })
            this.sound_game = true
        }
        return
    }

    static play_home() {
        if (!this.sound_home) {
            sound.play('sound_home', { loop: true, volume: 0.5 })
            this.sound_home = true
        }
        return
    }

    static stop_eat() {
        sound.stop('sound_eat')
    }

    static stop_game() {
        if (this.sound_game) {
            sound.stop('sound_game')
            this.sound_game = false
        }
        return
    }

    static stop_home() {
        if (this.sound_home) {
            sound.stop('sound_home')
            this.sound_home = false
        }
        return
    }


}