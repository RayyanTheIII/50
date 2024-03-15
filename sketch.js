var player;
var enemyGroup;
var gameOver = false;
var score = 0;
var enemySpeed = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createSprite(100, 200, 30, 30);
  enemyGroup = new Group();
}

function draw() {
  background("#000000");

  if (!gameOver && frameCount % (120 - enemySpeed) === 0) {
    for (let i = 0; i < 3; i++) {
      createEnemy();
    }
  }

  if (!gameOver) {
    score++; 
    if (keyIsDown(UP_ARROW)) {
      player.position.y -= 10;
    } else if (keyIsDown(DOWN_ARROW)) {
      player.position.y += 10;
    }
  }

  if (!gameOver && player.collide(enemyGroup)) {
    gameOver = true;
  }

  if (gameOver) {
    textSize(48);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over\nScore: " + score, width / 2, height / 2);
  } else {
    textSize(24);
    fill(255);
    textAlign(LEFT, TOP);
    text("Score: " + score, 20, 20);
  }

  drawSprites();
}

function createEnemy() {
  let enemy = createSprite(width, random(height), 30, random(height)); 
  enemy.shapeColor = color(255, 0, 0);
  enemy.velocity.x = -enemySpeed;
  enemy.setCollider("circle", 0, 0, 15);
  enemyGroup.add(enemy);
}