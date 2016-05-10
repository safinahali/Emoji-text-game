// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
    // Load the bird sprite
    game.load.image('bird', 'assets/ghost.svg'); 
    // game.load.image('pipe', 'assets/pipe.png');
    // game.load.image('pix', 'assets/pix.svg');

    //load obstacles
    game.load.image('1', 'assets/001-home.png');
    game.load.image('2', 'assets/004-office.png');
    game.load.image('3', 'assets/005-newspaper.png');
    game.load.image('4', 'assets/006-pencil.png');
    game.load.image('5', 'assets/008-quill.png');
    game.load.image('6', 'assets/012-droplet.png');
    game.load.image('7', 'assets/017-headphones.png');
    game.load.image('8', 'assets/022-dice.png');
    game.load.image('9', 'assets/027-bullhorn.png');
    game.load.image('10', 'assets/029-podcast.png');
    game.load.image('11', 'assets/059-cart.png');
    game.load.image('12', 'assets/083-stopwatch.png');


    },


create: function() { 
    var objectnames = ["", "home",
    "office",
    "newspaper",
    "pencil",
    "quill",
    "droplet",
    "headphones",
    "dice",
    "bullhorn",
    "podcast",
    "cart",
    "stopwatch"]

    var count = 0;

    // Change the background color of the game to blue
    game.stage.backgroundColor = '#d3d3d3';

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();


    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 100, 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 800;  


    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 //   spaceKey.onDown.add(this.jump, this);     

   var mytextbox = document.getElementById("mytextbox"); 
    if(mytextbox.value === "0"){spaceKey.onDown.add(this.jump, this);}
    if(mytextbox.value === objectnames[count]){spaceKey.onDown.add(this.jump, this);}
    

    // Create an empty group
    // this.pipes = game.add.group(); 
    this.pixes = game.add.group();

    // this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
    this.timer = game.time.events.loop(1500, this.addOnePix, this);

    //Score
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", 
    { font: "30px Arial", fill: "#ffffff" });   
//    this.labelScore.visible = false;

},

update: function() {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 600)
        this.restartGame();

    //restart if collision
   game.physics.arcade.overlap(
   this.bird, this.pixes, this.restartGame, null, this);
},

// Make the bird jump 
jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
},

// Restart the game
restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
},

/*addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
},*/

addOnePix: function(x, y) {
    // Create a pipe at the position x and y
    // var pix = game.add.sprite(x, y, 'pix');
    count = Math.floor(Math.random() * 9) + 2;
    var obstacle = count.toString();
    var pixposition = Math.random() * (400) + 50;
    //test 
    //var pix = game.add.sprite(900, 0, obstacle);
    var pix = game.add.sprite(800, pixposition, obstacle);

    // Add the pipe to our previously created group
    this.pixes.add(pix);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pix);

    // Add velocity to the pipe to make it move left
    pix.body.velocity.x = -200; 

    //Change size of the pix
    var pixsize = Math.random();
    pix.width = pixsize * (80) + 10;
    pix.height = pixsize * (80) + 10;

    // Automatically kill the pix when it's no longer visible 
    pix.checkWorldBounds = true;
    pix.outOfBoundsKill = true;

    //increase score everytime a new obstacle is added
     this.score += 1;
    if (this.score <= 3) {this.labelScore.text = 0;}
    else {this.labelScore.text = this.score - 3;} 
//   this.labelScore.text = iptext.value;

},

/*addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePix(400, i * 60 + 10);   
},*/

/*Textboxparse: function() {
     var textbox = document.getElementById('mytextbox'); 
     alert(textbox.value);
}*/

};

// Initialize Phaser, and create a 900px by 400px game
var game = new Phaser.Game(1200, 600); 

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true); 
