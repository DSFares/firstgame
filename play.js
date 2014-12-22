//Contains all main game mechanics

var play_state = {

    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.  
    create: function() {
  
        // Initialize Space Key
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // Call the 'jump' function when the spacekey is hit
        space_key.onDown.add(this.jump, this);
        
        /*
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        */
        
        // Create a group of pipes
        this.pipes = game.add.group(); // Create a group
            /* not included? 
            this.pipes.enableBody = true; // Add physics to the group */
        this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes
        // Add pipes to the screen every 1.5 seconds
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
  
        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 245, 'bird');
        
        /*
        // Add gravity to the bird to make it fall
        game.physics.arcade.enable(this.bird);
        */
        
        this.bird.body.gravity.y = 1000;
        // change the center of rotation for the bird to make flying animation more natural
        this.bird.anchor.setTo(-0.2, 0.5);
        
        // Add the score display to the top left of the screen
        score = 0;
        var style = { font: "30px Arial", fill: "#ffffff"};
        this.label_score = game.add.text(20, 20, "0", style);
        
        // Add jump sound to game
        this.jumpSound = game.add.audio('jump');
    },
  
    // This function is called 60 times per second
    // It contains the game's logic  
    update: function() {
    
        //If the bird is out of the world (too high or too low), call the 'restartGame' function
        if (this.bird.inWorld == false)
            this.restart_game();
        
        // Slowly rotate the bird downward for gravity
        if (this.bird.angle < 20)
            this.bird.angle += 1;
            
        // Call the hitPipe function everytime the bird collides with a pipe
        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);
        
    },
  
    // Make the bird jump
    jump: function() {
        
        // If bird is dead, it shouldn't be able to jump :-p
        if(this.bird.alive == false)
            return;
        
        // Play sound whenever bird jumps
        this.jumpSound.play();
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
        // Rotate Bird when Bird jumps. Use an animation over time so that it isn't an immediate shift, but gradual.
        // Create an animation on the bird
        var animation = game.add.tween(this.bird);
        // Set the animation to change the angle of the sprite to -20 degrees in 100 milliseconds
        animation.to({angle: -20}, 100);
        // And start the animation
        animation.start();
    },
    
    // Called whenever bird hits a pipe
    hit_pipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;
        
        // if the bird hasn't hit a pipe, set the alive property of the bird to false
        this.bird.alive = false;
        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);
        
        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    // Restart the game
    restart_game: function() {
        
        // Go Back to the menu state when the game ends
        this.game.state.start('menu');
    },
    
    add_one_pipe: function(x, y) {
        
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();
        // Set the new position of the pipe
        pipe.reset(x, y);
        //Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;
        // Kill the pipe when it's no longer visible
            /* unneccesary
            pipe.checkWorldBounds = true;*/
        pipe.outOfBoundsKill = true;
    },
    
    add_row_of_pipes: function() {
    
        // Pick where the hole will be
        var hole = Math.floor(Math.random() * 5) + 1;
        
        // Add the 6 pipes
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addOnePipe(400, i * 60 + 10);
        
        // Add 1 to the score every time pipes are created and update score
        score += 1;
        this.label_score.content = score;
    }
};