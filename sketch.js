var hotairballon, hotairballonimg;
var biulding1, biuldingimg1 , biulding2 , biuldingimg2;
var bgimg, bg;
var light, lightimg;
var bird, birdimg;
var diesound;
var jumpsound;
var biulding;
var restart , restartimg;
var gameover , gameoverimg;
var score = 0;
var birds;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 

function preload() {
hotairballonimg = loadImage("./assets/obsTop1.png");
bgimg = loadImage("./assets/bg.png");
birdimg = loadImage("./assets/obsTop2.png");
biuldingimg1 = loadImage("./assets/obsBottom1.png");
lightimg = loadImage("./assets/obsBottom2.png");
biuldingimg2 = loadImage("./assets/obsBottom3.png");
diesound = loadSound("./assets/assets_die.mp3")
jumpsound = loadSound("./assets/assets_jump.mp3");
restartimg = loadImage("./assets/restart.png");
gameoverimg = loadImage("./assets/fimdejogo.png");
}
function setup() {
createCanvas(1900,950);



/*imageMode(CENTER);
bg = createSprite(750,350);
bg.addImage(bgimg);
bg.scale = 1.3*/

hotairballon = createSprite(100,200,20,50);
hotairballon.addImage(hotairballonimg);
hotairballon.scale = 0.3;

/*biulding1 = createSprite(200,390,800,20);
biulding1.addImage(biuldingimg1);
biulding1.scale = 0.25;

biulding2 = createSprite()
biulding2.addImage(biuldingimg2);
biulding2.scale = 0.25;*/

//light = createSprite()
//light.addImage(lightimg)
//light.scale = 0.15;

gameover = createSprite(950,415);
gameover.addImage(gameoverimg);
gameover.scale = 0.5;

restart = createSprite(950,460);
restart.addImage(restartimg);
restart.scale = 0.6;

biuldingsGroup =  new Group();
birdsGroup = new Group();

hotairballon.debug = true;
hotairballon.setCollider("rectangle",0,0,500,740);
}

function draw() {
background(bgimg);
if (gameState === PLAY) {
 hotairballon.velocityY = hotairballon.velocityY +1;
 spawbiuldings();
 spawbirds();
 if(keyDown(UP_ARROW)) {
    hotairballon.velocityY = -10
    jumpsound.play();
    }
    gameover.visible = false;
    restart.visible = false;
}
score = score + Math.round(getFrameRate()/60);
if (hotairballon.isTouching(biuldingsGroup)||hotairballon.isTouching(birdsGroup)) {
gameState = END;
diesound.play();
}

if (gameState === END) {
gameover.visible = true;
restart.visible = true;
hotairballon.velocityY = 0;
biuldingsGroup.setVelocityXEach(0);
birdsGroup.setVelocityXEach(0); 
if (mousePressedOver(restart)) {
reset();

}
}
fill("red");
textSize(30);
text("pontuação:" +score,1600,75)

fill("black");
stroke("red");
text("Daniel" , 950, 300);
drawSprites();
}
function spawbiuldings() {
if (World.frameCount %130 ===0) {
biulding = createSprite(2000,730,40,50);
biulding.scale = 0.25;
biulding.velocityX = -5;

/*bird = createSprite(1000,300);
//bird.addImage(birdimg);
bird.velocityX = -5;
bird.scale = 0.250;*/

//biulding.y = Math.round(random(10,100));
var rand = Math.round(random(1,3));
switch (rand) {
case 1: biulding.addImage(biuldingimg1);
break;
case 2: biulding.addImage(biuldingimg2);
break;
case 3: biulding.addImage(lightimg);
break;
default: break;
}
biuldingsGroup.add(biulding);
biuldingsGroup.lifetime = 400;
//biuldingsGroup.add(biuldings2);
//biuldingsGroup.add(light);
}
}
function spawbirds() {
if (World.frameCount %230 ===0) {
 bird = createSprite(1000,300);
 bird.addImage(birdimg);
 bird.scale = 0.250;
 bird.velocityX = -5;

 birdsGroup.add(bird);
 bird.lifetime = 400;
 bird.y = Math.round(random(475,10));
}


}
function reset() {
gameState = PLAY;
gameover.visible = false;
restart.visible = false;
biuldingsGroup.destroyEach();
birdsGroup.destroyEach();
score = 0;
hotairballon.x = 100;
hotairballon.y = 200;
}