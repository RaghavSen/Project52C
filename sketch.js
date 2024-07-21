var PLAY = 1;
var START = 0;
var END = 2;  
var gameState = START;  
var score = 0;
var flappy, flappyImg, flappyflyImg;
var backgroundImg, background1;
var obstacle2Img;
var obstacle1Img;
var obstaclesGroup;
var resetImg, reset;
var gameOverImg, gameOver; 
var Win;

function preload() {
    backgroundImg = loadImage("background2.jpg");
    flappyImg = loadImage("FlappyBird.png");
    obstacle1Img = loadImage("obstacle1.png");
    obstacle2Img = loadImage("obstacle2.png");
    flappyflyImg = loadAnimation("FlappyBirdFly.png");
    gameOverImg = loadImage("gameOver.png");
    resetImg = loadImage("restart.png");
}

function setup() {
    createCanvas(600, 400);
    background1 = createSprite(width / 2, height / 2, canvas.width, canvas.height);
    background1.addImage(backgroundImg);
    background1.velocityX = 0;  
    
    flappy = createSprite(80, 100, 80, 80);
    flappy.addImage(flappyImg);
    flappy.scale = 0.2;
    
    obstaclesGroup = new Group();
    score = 0;
}

function draw() {
    background(255);  

    if (gameState === START) {
        textSize(20);
        fill("black");
        textAlign(CENTER);  
        text("Press Up Arrow key to start the game. Have fun :)", width / 2, height / 2);
        flappy.velocityX = 0;
        flappy.velocityY = 0;
        background1.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0); 

        if (keyDown(UP_ARROW)) {
            gameState = PLAY;
            background1.velocityX = -9; 
        }
    } else if (gameState === PLAY) {
        score += Math.round(getFrameRate() / 60); 
        
        flappy.velocityY = 5;

        if (background1.x < 0) {
            background1.x = background1.width / 2;
        }

        if (keyDown(UP_ARROW)) {
            flappy.velocityY = -5;
            flappy.velocityX = 1;
        }

        if (obstaclesGroup.isTouching(flappy)) {
            gameState = END;
            gameOver();  
        }

        if (flappy.x > 400) {
            gameState = END;
            gameWon();  
        }

        spawnObstacles();
    } else if (gameState === END) {
        flappy.velocityX = 0;
        flappy.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);  
        background1.velocityX = 0; 
    }

    drawSprites();  

   
    textSize(20);
    fill("black");
    text("Score: " + score, 30, 50);
}

function spawnObstacles() {
  if(frameCount % 20 === 0) {
    var obstacle = createSprite(600,50,20,30);
    obstacle.setCollider("rectangle",0,0,100,100)
    obstacle.debug = true
    obstacle.velocityX = -8
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1:
        obstacle.y = 50
        obstacle.addImage(obstacle1Img);
       break;
      case 2: 
      obstacle.y = 300
      obstacle.addImage(obstacle2Img);
              break;
      default: break;
    }           
    obstacle.scale = 0.9;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
function gameWon() {
    swal({
        title: `You Won`,
        text: "Good Game",
        imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "OK"
    }).then(() => {
        gameState = END;  // Set gameState to END
    });
}

function gameOver() {
    swal({
        title: `Game Over`,
        text: `Better luck next time!\nYour Score: ${score}`,
        imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/gameOver.png",
        imageSize: "100x100",
        confirmButtonText: "Try Again"
    }).then(() => {
        // Reset game variables if needed
        resetGame();
    });
}

function resetGame() {
    gameState = START;
    score = 0;
    flappy.x = 80;
    flappy.y = 100;
    flappy.velocityX = 0;
    flappy.velocityY = 0;
    obstaclesGroup.destroyEach();
    background1.x = width / 2;
    background1.velocityX = 0;  
}
