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
                'bgGameMenu': '../assets/images/bgmenu.png',
                'bgGameLv2': '../assets/images/bglv2.jpg',
                'item_bg_menu': '../assets/images/menustart.png',
                'item_home': '../assets/images/buttonhome.png',
                'item_option': '../assets/images/option.png',
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
