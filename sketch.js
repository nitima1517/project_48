//const Engine = Matter.Engine;
//const World= Matter.World;
//const Bodies = Matter.Bodies;
//const Constraint = Matter.Constraint;
var gameState='landingPage';
var score;



function preload(){
jerryAnimation=loadAnimation("pics/run1.png","pics/run2.png","pics/run3.png");
jerryImage=loadImage("pics/end.png");
dogImage=loadImage("pics/dog4.png");
endBackground=loadImage("pics/backgroundEnd.jpeg")
dogAnimation=loadAnimation("pics/dog1.png","pics/dog2.png","pics/dog3.png","pics/dog4.png")
//tomJump=loadImage("pics/tomjump.png");
//tomfly=loadImage("pics/tomfly.png");

tomAnimation=loadAnimation("cat images/catrun1.png","cat images/catrun2.png","cat images/catrun3.png",
"cat images/catrun4.png","cat images/catrun5.png",
"cat images/catrun6.png","cat images/catrun7.png","cat images/catrun8.png");

Mainbackground=loadImage("pics/mainBG.png");
Next=loadImage("pics/next.png");
background1=loadImage("pics/background 1.jpeg");
background2=loadImage("pics/background 2.png");
}

function setup(){
    createCanvas(1200,600)
    level1=createSprite(displayWidth/2,displayHeight/2-100,30,30);
    level1.addImage(background1);
    level1.scale=2;
    level1.velocityX=-10;
    level1.visible=false;

    MainBackground=createSprite(displayWidth/2-450,displayHeight/2-250,30,30);
    MainBackground.addImage(Mainbackground);
    MainBackground.scale=0.5

    next=createSprite(1000,500,50,50);
    next.addImage(Next);
    next.scale=0.2

    level2BG=createSprite(displayWidth/2,displayHeight/2-300,30,30);
    level2BG.addImage(background2);
    level2BG.velocityX=-10
    level2BG.visible=false;
    level2BG.scale=1.5

    jerry=createSprite(400,500,20,20)
    jerry.addAnimation("jerryrun",jerryAnimation);
    jerry.scale=0.7;

    jerry2=createSprite(400,500,20,20)
    jerry2.addImage(jerryImage);
    jerry2.scale=0.7;
    jerry2.visible=false;
    //jerry2.debug=true;
    //jerry2.setCollider("rectangle",0,0,60,60);

    dog2=createSprite(530,500,20,20);
    dog2.addImage(dogImage)
    dog2.visible=false;

    tom=createSprite(jerry.x-200,jerry.y,20,20);
    tom.addAnimation("tomrun",tomAnimation);

    ground=createSprite(600,580,1200,20);

   
   dogGroup=new Group();
    

    score=0;

    
}

function draw(){
background(0);

if(keyDown("space")&&gameState=='end'){
    gameState='landingPage';
    console.log("hi");
}

if(gameState=='landingPage'){
    MainBackground.visible=true;
level1.visible=false;
next.visible=true;
jerry.visible=false;
tom.visible=false;
ground.visible=false;
jerry2.visible=false;
//level2BG.visible=false;
dog2.visible=false;
if(mousePressedOver(next)){
    gameState='level1'
}

drawSprites();
}


if(gameState=='level1'){

    score=score+Math.round(getFrameRate()/60)
 level1.visible=true;
next.visible=false;
jerry.visible=true;
tom.visible=true;

//level2BG.visible=false;
MainBackground.visible=false;
ground.visible=false;
if(keyWentDown("right")){
    tom.velocityX=4;
}

if(keyWentUp("right")){
    tom.velocityX=0
}

if(keyWentDown("enter")){
    jerry.velocityX=4;
}

if(keyWentUp("enter")){
    jerry.velocityX=0
}
if(level1.x<0){
 level1.x=displayWidth/2
}

drawSprites();
fill("black")
textSize(20);
text("score:"+score,displayWidth-1000,50);

if(score>10){
    gameState="level2"
}
}

if (keyDown("space")){
    jerry.velocityY=-12
}


jerry.collide(ground);

jerry.velocityY=jerry.velocityY+0.5


   

if(gameState=="level2"){
    background("orange");
    score=Math.round(1.2*getFrameRate()/60+score)
   level2BG.visible=true;
    level1.visible=false;
    tom.visible=false;
    next.visible=false;

    if(level2BG.x<0){
        level2BG.x=displayWidth/2
    }
    spawnDog();

    if(jerry.isTouching(dogGroup)){
        gameState="end"
    }
    drawSprites();
    fill("black")
textSize(20);
text("score:"+score,displayWidth-1000,50);

}

if(gameState==="end"){
    background(endBackground);
level2BG.visible=false;
jerry.visible=false;
jerry2.visible=true;
dogGroup.setVisibleEach(false);
//dogGroup.setVelocityXEach(0);
//dogGroup.pause();
//jerry.pause();
dog2.visible=true;
drawSprites();
textSize(20);
fill("white")
text("score:"+score,displayWidth-1000,50);
textSize(70);
fill("black");
textFont("ariel")
text("Game End",500,280);

}



}

function spawnDog(){
    if(World.frameCount%100===0){
        var dog=createSprite(displayWidth,height-100,10,10)
       dog.addAnimation("dogrun",dogAnimation);
        dog.velocityX=-10;
        dogGroup.add(dog);
        console.log("test")
    }
}