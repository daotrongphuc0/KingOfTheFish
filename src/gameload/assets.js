export const manifest = {
    bundles: [
        {
            name: 'mainFish',
            assets: [
                {
                    name: 'mainFish01',
                    srcs: '../assets/images/fish.png',
                },
                {
                    name: 'mainFish02',
                    srcs: '../assets/images/eat.png',
                },
            ],
        },
        {
            name: 'smallFish',
            assets: {
                'smallFish01': '../assets/images/ca.png',
            }
        },
        {
            name: 'bigFish',
            assets: {
                'bigFish01': '../assets/images/Shark.png',
            }
        },
        {
            name: 'background',
            assets:
            {
                'bgGame': '../assets/images/bg.png',
                'bgGameOver': '../assets/images/gameOver.png',
                'bgGameMenu': '../assets/images/bgmenu.jpg',
                'bgGameLv2': '../assets/images/bglv2.jpg',
            }

        },
        {
            name: "sprite",
            assets: {
                'btn_exit': '../assets/images/exit.png',
                'btn_play': '../assets/images/play.png',
                'btn_level1': '../assets/images/lv1.png',
                'btn_level2': '../assets/images/lv2.png',
                'btn_challenge': '../assets/images/challenge.png',
                'btn_option': '../assets/images/option.png',
                'btn_home': '../assets/images/home.png',
            }
        },
        {
            name: "sound",
            assets: {
                'sound_eat': '../assets/sound/eat.wav',
                'sound_game': '../assets/sound/game.mp3',
                'sound_home': '../assets/sound/home.mp3'
            }
        }
    ]
};
