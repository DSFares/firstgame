// load all of our assets like we did in preload

var load_state = {
    
    // This function will be executed at the beginning
    // That's where we load the game's assets
    preload: function() {
    
        // Change the background color of the game
        this.game.stage.backgroundColor = '#71c5cf';
    
        // Load the bird sprite
        this.game.load.image('bird', 'assets/bird.png');
    
        // Load the pipe sprite
        this.game.load.image('pipe', 'assets/pipe.png');
        
        // Load the jump sound
        this.game.load.audio('jump', 'assets/jump.wav');
    },
    
    // This function is called after the preload function
    create: function() {
        
        // when all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};