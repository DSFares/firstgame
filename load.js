var loadState = {
    preload: function() {
        
        // Change the background color of the game
        game.stage.backgroundColor = '#71c5cf';
    
        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');
    
        // Load the pipe sprite
        game.load.image('pipe', 'assets/pipe.png');
        
        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');
    },
    
    create: function() {
        game.state.start('main');
    }
};