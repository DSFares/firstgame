var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var score = 0;
var style = { font: "30px Arial", fill: "#ffffff" };

game.state.add('load', loadState);
game.state.add('play', playState);
game.state.add('menu', menuState);

game.state.start('load');