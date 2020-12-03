var bg,mario,ground;
var marioImg;
var groundImg;
var count=0;
var bgImg;
var goombaGroups;
var goombaImg;
var gameState="play";
var mario3Img;
var mario_jumping;

function preload(){
marioImg=loadAnimation("Images/mario1.png","Images/mario2.png");
bgImg=loadImage("Images/bg.jpg");
goombaImg=loadAnimation("Images/goomba.png","Images/goomba1.png");
mario3Img=loadImage("Images/mario3.png");
mario_jumping=loadSound("Mario_jumping.mp3");

}



function setup() {  
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  bg.scale=2;
  bg.addImage("bg",bgImg);
  
  bg.velocityX=-10
  bg.x=bg.width/2;
  ground=createSprite(windowWidth/2,windowHeight-150,windowWidth,10);
  //ground.addImage("icyground",groundImg);
  ground.scale=3;
  //ground.visible=false;

  goombaGroup=new Group();

  mario=createSprite(100,windowHeight-200,70,80);
  mario.addAnimation("mario",marioImg);
  mario.addAnimation("mario2",mario3Img);
}

function draw() {
  
  background(0,0,0);
  mario.collide(ground);
  textSize(30);
  text("Score: "+ count,displayWidth-200, 100);
  drawSprites();

  if (gameState==="play"){
    if (bg.x<0){
      bg.x=bg.width/2
    }
    if (keyDown("space")){
      mario.velocityY=-20;
      mario_jumping.play();
      }
      mario.velocityY=mario.velocityY+0.8;
      count = Math.round(World.frameCount/4); 
      goomba();
      if (goombaGroup.isTouching(mario)){
      gameState="end";
      }

  }
  if (gameState==="end"){
   bg.velocityX=0;
   mario.changeAnimation("mario2",mario3Img);
   goombaGroup.destroyEach();
  }

}

function goomba(){
  if (World.frameCount%100===0){
    var goomba=createSprite(windowWidth,windowHeight-170,30,30);
    goomba.velocityX=-10;
    //goomba.addAnimation("goomba",goombaImg);
    goomba.scale=5;
    goomba.collide(ground);
    goombaGroup.add(goomba);
    goomba.lifetime=windowWidth/10;
  }
}


