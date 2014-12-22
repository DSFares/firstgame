// This is where we set our in game start menu

var menu_state = {
    create: function() {
        // Call the 'start' function when pressing the spacebar
        // Initialize Space Key
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
        
        // Defining variables
        var style = { font: "30px Arial", fill: "#ffffff" }; // font color and size
        var x = game.world.width/2, y = game.world.height/2; // find center of screen
        
        // Adding text centered on the screen
        var text = this.game.add.text(x, y-50, "Press space to start", style);
        text.anchor.setTo(0.5, 0.5);
        
        // If the user already played
        if (score > 0) {
            // Display its score
            var score_label = this.game.add.text(x, y+50, "score: " + score, style);
            score_label.anchor.setTo(0.5, 0.5);
        }
    },
    
    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};