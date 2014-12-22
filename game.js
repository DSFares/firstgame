var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('load');