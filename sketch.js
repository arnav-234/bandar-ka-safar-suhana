var gamestate = 1
var PLAY = 1
var END = 0
var monkey, monkey_running, monkeygameover
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivaltime

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png","sprite_8.png")

  monkeygameover = loadAnimation();
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  score = 0
  survivaltime = 0
}



function setup() {


  monkey = createSprite(40, 300) 
  monkey.addAnimation("bandar", monkey_running)
  monkey.scale = 0.15

  invisibleground = createSprite(300, 347, 1400, 10)
  invisibleground.velocityX = -(8+(survivaltime/200))

  bananagrp = createGroup()
  obsgrp = createGroup()  
}


function draw() {
  createCanvas(600, 580)
  background("white")
  if (gamestate === PLAY) {
    if (invisibleground.x < 0) {
      invisibleground.x = invisibleground.width / 2;
    }
     monkey.collide(invisibleground)
      if (gamestate === PLAY) {
      if (keyDown("space") && monkey.y >= 290) {
        monkey.velocityY = -14

      }
      monkey.velocityY = monkey.velocityY + 0.8
      if (monkey.isTouching(bananagrp)) {
        bananagrp.destroyEach()
        score = score + 1
      }
      stroke("black")
      textSize(20)
      fill("black")
      text("score" + score, 500, 100)

      stroke("black")
      textSize(20)
      fill("black")
      survivaltime = survivaltime +
        Math.round(getFrameRate() / 60);
      text("survival time" + survivaltime, 50, 100)
        
         monkey.visible=true
    bananagrp.visible=true
  
    }
    
    if (monkey.isTouching(obsgrp)) {
      gamestate = END
        obsgrp.destroyEach();
       bananagrp.destroyEach();
    }
  } else if (gamestate === END) {

    invisibleground.velocityX = 0;
    monkey.velocityY = 0

    bananagrp.setLifetimeEach(-1);
    obsgrp.setLifetimeEach(-1);

    bananagrp.setVelocityXEach(0);
    obsgrp.setVelocityXEach(0);
   
    monkey.visible=false
    bananagrp.visible=false
  
    stroke("black")
      textSize(50)
      fill("black")
    text("GAMEOVER",150,300 )
    
    stroke("black")
      textSize(20)
      fill("black")
    text("PRESS R TO CONTINUE",180,380 )
    invisibleground.visible=false
    
    if(keyDown("R")){ 
    gamestate=PLAY
    invisibleground.visible=true
      score=0
      survivaltime=0
    }
  
  }
  bananas();
  obstacles()
  drawSprites();

}


function bananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(700, 200)
    banana.addImage(bananaImage)
    banana.scale = 0.10
    banana.velocityX = -(8+(score/4))
    banana.lifetime = 110
    bananagrp.add(banana)
  }

}
function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(700, 320)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.15
    obstacle.velocityX = -(8+(survivaltime/200))
    obstacle.lifetime = 110
    invisibleground.depth = obstacle.depth
    invisibleground.depth = invisibleground.depth + 1
    obsgrp.add(obstacle)
  
}
}
