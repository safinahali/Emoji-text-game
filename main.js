// Create our 'main' state that will contain the game

//variables
var count = 0;
var platforms;

var mainState = {
    preload: function() { 
    // Load the bird sprite
    game.load.spritesheet('bird', 'assets/jumpingman.png'); 
    // game.load.image('pipe', 'assets/pipe.png');
    // game.load.image('pix', 'assets/pix.svg');


    

    var i;
    for (i = 1; i < 846; i++)
    {
        var istring = i.toString();
        game.load.image (istring, 'assets/emoji/' + istring + '.png');
    }

    game.load.image('ground', 'assets/platform.png');

   /* //load obstacles
    game.load.image('1', 'assets/woman.png');
    game.load.image('2', 'assets/children.png');
    game.load.image('3', 'assets/blanket.png');
    game.load.image('4', 'assets/bucket.png');
    game.load.image('5', 'assets/wall.png');
    game.load.image('6', 'assets/baby.png');
    game.load.image('7', 'assets/hairdryer.png');
    game.load.image('8', 'assets/milkcrate.png');
    */
    },

create: function() { 
    var objectnames = ["", "woman",
    "children",
    "newspaper",
    "blanket",
    "bucket",
    "wall",
    "hairdryer",
    "milkcrate"]

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 4, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(4, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // Change the background color of the game to blue
    game.stage.backgroundColor = '#e7e7e7';
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 100, 'bird');
    this.bird.width = 40;
    this.bird.height = 60;

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    this.bird.body.bounce.y = 0.2;
    this.bird.body.gravity.y = 300;
    this.bird.body.collideWorldBounds = true;

    // Call the 'jump' function when the "Enter" key is hit
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    //spaceKey.onDown.add(this.jump, this);     

    //audio note whenever the player jumps
    var audio = new Audio('assets/jump.wav');


    //check for text in the text box
    var mytextbox = document.getElementById("mytextbox"); 
    if(mytextbox.value === "0"){spaceKey.onDown.add(this.jump, this);
    audio.play();}
    if(mytextbox.value === objectnames[count]){spaceKey.onDown.add(this.jump, this);
    audio.play();}
    

    // Create an empty group
    // this.pipes = game.add.group(); 
    this.pixes = game.add.group();
    this.timer = game.time.events.loop(5500, this.addOnePix, this);


    //Score
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", 
    {font: "30px Arial", fill: "#000" });   
//  this.labelScore.visible = false;



},

update: function() {
   

    //restart if collision
   game.physics.arcade.collide(this.bird, this.platforms);

   game.physics.arcade.overlap(this.bird, this.pixes, this.restartGame, null, this);




    document.getElementById('mytextbox').onkeypress = function(e)
    {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
        // Enter pressed
        return false;
    }
  }

   
},

// Make the man jump 
jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
},

// Restart the game
restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
},

addOnePix: function(x, y) {
 
    //if (count == 8) {this.restartGame();}

    count += 1;
    var obstacle = count.toString();
    var obstacleNumber = (Math.floor(Math.random() * 845) + 1).toString();
    var pix = game.add.sprite(1200, 330, obstacleNumber);

    // Add the pipe to our previously created group
    this.pixes.add(pix);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pix);

    // Add velocity to the pipe to make it move left
    pix.body.velocity.x = -200; 

    //Change size of the pix
    pix.width = 50;
    pix.height = 50;

    // Automatically kill the pix when it's no longer visible 
    pix.checkWorldBounds = true;
    pix.outOfBoundsKill = true;

    //increase score when new obstacle is added
    this.score += 1;
    this.labelScore.text = this.score;

},
};

// Initialize Phaser, and create a 900px by 400px game
var game = new Phaser.Game(1300, 400); 

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true); 
