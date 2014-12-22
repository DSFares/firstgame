var menuState = {
    
    create: function() {
        // Initialize Space Key
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.start, this);
        
        // Define center of page
        var x = game.world.width/2, y = game.world.height/2;
        
        // Add centered text in center of screen
        var text = this.game.add.text(x, y-50, "Press space to start", style);
        text.anchor.setTo(0.5,0.5);
        
        // If the user just died, show score
        if (score > 0) {
            // Display the score under "Press space to start"
            var scoreLabel = this.game.add.text(x, y+50, "score: " + score, style);
            scoreLabel.anchor.setTo(0.5, 0.5);
        }
    },
    
    // start the actual game
    start: function() {
        game.state.start('play');
    }
};