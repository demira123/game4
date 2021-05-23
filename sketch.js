var background1
var background2
var background3
var gameState="start"
var player
var Score=0
var deer, dog, horse

function preload(){
  background1=loadImage("background1.jpg")
  background2=loadImage("background2.jpg")
  background3=loadImage("background3.jpg")
  background4=loadImage("road scene.jpg")
  background5=loadImage("grassy field.jpg")
  background6=loadImage("grassy field 2.jpg")
  
  player=loadImage("rabbit.png")
  rockimg=loadImage("rock.png")
  carrotimg=loadImage("carrot.png")
  deerimg=loadImage("deer.png")
  horseimg=loadImage("horse.png")
  dogimg=loadImage("dog.png")


  appleimg=loadImage("apple 1.png")
  mushroomimg=loadImage("mushroom.png")
  boneimg=loadImage("bone.png")
 
  wolfimg=loadImage("wolf.jpg")
  meanLadyimg=loadImage("meanLady.png")
  fenceimg=loadImage("fence.jpg")
  gameover=loadImage("gameOver.jpg")
}
function setup() {
  createCanvas(800,500)
  bg1 = createSprite(400, 250)
  bg1.addImage(background1)
  bg1.scale=3
  rabbit=createSprite(200, 435)
  rabbit.addImage(player)
  rabbit.visible = false
  rock1=createGroup()
  carrot1=createGroup()
  apple1=createGroup()
  mushroom1=createGroup()
  bone1=createGroup()

  fence1=createGroup()
  wolf1=createGroup()
  meanLady1=createGroup()
  edges=createEdgeSprites()
  
  deer=createSprite(160,280)
  deer.addImage(deerimg)
  
  dog=createSprite(360,280)
  dog.addImage(dogimg)
  
  horse=createSprite(600,280)
  horse.addImage(horseimg)

  dog.visible=false
  horse.visible=false
  deer.visible=false
  
  bg3=createSprite(400,250)
  bg3.addImage(background3)
  bg3.scale = 3
  bg3.visible=false
  
  //dog scene
  bg4=createSprite(400,250)
  bg4.addImage(background4)
  bg4.scale=3.3
  bg4.visible=false

  //deer scene
  bg5=createSprite(400,250)
  bg5.addImage(background5)
  bg5.scale=3.2
  bg5.visible=false
  
  //horse scene
  bg6=createSprite(400,250)
  bg6.addImage(background6)
  bg6.scale=3.2
  bg6.visible=false

  bg2=createSprite(400,250)
  bg2.addImage(background2)
  bg2.scale=3
  bg2.visible=false
  
  gameOver=createSprite(400,250)
  gameOver.addImage(gameover)
  gameOver.visible=false

  //rabbit.debug=true
  rabbit.setCollider("circle" , 0,0, 90)
  //dog.debug=true
  dog.setCollider("circle",0,0,100)
  //horse.debug=true
  horse.setCollider("circle",0,0,100)
}

function draw() {
  
   background(255)
   
   
   drawSprites()
  if(gameState==="start"){
    fill("black")
    textSize(30)
    text("Press Space to Play!" , 210,250)
  }
  if(keyDown("SPACE")&& gameState==="start"){
    bg2.visible=true
    gameState="play"
  }
//changing to the PLAY state-------------------------------------------------
  if(gameState==="play"){
    
      rabbit.visible=true
      rabbit.depth=bg2.depth+1
      bg2.velocityX=-3
      bg2.scale=5.3
      if(bg2.x<0){
        bg2.x=400
      }
      textSize(25)
      fill("black")
      text("Score: " + Score,100,50)
      spawnRocks();
      spawnCarrots()
      
     
  
      if(carrot1.isTouching(rabbit)){
        carrot1.destroyEach()
        Score=Score+3
      }
      if(keyDown("space")&& rabbit.y>=320){
        rabbit.velocityY = -13
        
        }
      
        rabbit.velocityY=rabbit.velocityY+1

      if(rock1.isTouching(rabbit)){
        gameState="end"
      }

  }


  //------------------gameState:end---------------------------
  if(gameState=="end"){
    bg2.visible = false
    rabbit.destroy()
    carrot1.destroyEach()
    rock1.destroyEach()
    bg3.visible = true
    fill("black")
    textSize(30)
    text(" Level 2  ",100,80)
    text(" Click the Animal You Want to Be! " ,80,110)
   
    
    dog.visible=true
    horse.visible=true
    deer.visible=true

    dog.depth = bg3.depth + 1
    horse.depth=bg3.depth+1
    deer.depth=bg3.depth+1

    if(mousePressedOver(dog)){
    gameState="dog"
    }
    
    if(mousePressedOver(deer)){
      gameState="deer"
    }
    
    if(mousePressedOver(horse)){
      gameState="horse"
    }
    
    
  }
  
 //--------------------------------------------gameState: deer------------------------------------------------------
  if(gameState=="deer"){
   
    deer.collide(edges[3])
    bg3.destroy()
    bg5.visible=true
    bg5.velocityX=-3
    bg5.scale=5.3
    if(bg5.x<0){
      bg5.x=400
    }
    deer.visible=true
    deer.depth=bg5.depth+1
    
    textSize(25)
    fill("black")
    text("Score: " + Score,100,50)
    
    spawnWolves()
    spawnMushroom()
    if(keyDown("space")&& deer.y>=280){
      deer.velocityY =-(Score*4)
      }
  
      deer.velocityY=deer.velocityY+1

      //deer.debug=true
      deer.setCollider("circle",0,0, 100)
  if(mushroom1.isTouching(deer)){
    mushroom1.destroyEach()
    Score=Score+3
  }
  
  if(wolf1.isTouching(deer)){
    gameState="dog"
    wolf1.destroyEach()
    mushroom1.destroyEach()
    deer.destroy()
  }

}

 //--------------------------------------------gameState: dog------------------------------------------------------

 if(gameState=="dog"){
  
  dog.collide(edges[3])
  bg5.destroy()
  bg4.visible=true
  bg4.velocityX=-3
  bg4.scale=6
  if(bg4.x<0){
    bg4.x=400
  }
  dog.visible=true
  dog.depth=bg4.depth+1
  dog.scale = 0.8
  dog.x=140
  spawnMeanLady()
  spawnBones()
  

  textSize(25)
  fill("black")
  text("Score: " + Score,100,50)

  if(keyDown("space")&& dog.y>=280){
    dog.velocityY = -(Score*4)
  }

  dog.velocityY=dog.velocityY+0.5
  //dog.debug=true
 
    
if(bone1.isTouching(dog)){
  bone1.destroyEach()
  Score=Score+3
}

if(meanLady1.isTouching(dog)){
  gameState="horse"
  meanLady1.destroyEach()
  bone1.destroyEach()
  dog.destroy()
}
}
    
//---------------------------------------------gameState:horse----------------------------------------------------------
  if(gameState=="horse"){

    horse.collide(edges[3])
    bg3.destroy()
    bg6.visible=true
    bg6.velocityX=-3
    bg6.scale=5.3
    if(bg6.x<0){
      bg6.x=400
    }
    horse.visible=true
    horse.depth = bg6.depth + 1
    horse.x=140
    
    textSize(25)
    fill("black")
    text("Score: " + Score,100,50)
    
    horse.scale=0.8
    spawnFences()
   spawnApples()
   console.log(horse.y)
   if(keyDown("space") && horse.y>=280){
    horse.velocityY =-(Score*4)
  }

    horse.velocityY=horse.velocityY+0.5
    //horse.debug=true
    if(apple1.isTouching(horse)){
      apple1.destroyEach()
      Score=Score+3
    }
    
    if(fence1.isTouching(horse)){
      gameState="gameOver"
      fence1.destroyEach()
      apple1.destroyEach()
      horse.destroy()
    }
  }

  //-------------------------------------gameState:gameOver-------------------------------
  if(gameState==="gameOver"){
   gameOver.visible= true
   gameOver.scale=3.5
   
  }
  //----------------------------------gameState:restart------------------------------
  
 //----------------------------------------------------colliding edges------------------------------------------------------
 
  //edges[leftedge, rightedge,topedge,bottomedge]
  rabbit.collide(edges[3])
  rabbit.collide(edges[2])
  horse.collide(edges[3])
  horse.collide(edges[2])
  deer.collide(edges[3])
  deer.collide(edges[2])
  dog.collide(edges[3])
  dog.collide(edges[2])
}

//--------------------------------------rock()----------------------------------------------
function spawnRocks(){
  if(frameCount%150==0){
    rock=createSprite(800,460)
    rock.addImage(rockimg)
    rock.velocityX=-5
    rock.scale=0.6
    rock1.add(rock)
    //rock.debug=true
  }
}
//--------------------------------carrot()---------------------------------------------------
function spawnCarrots(){
  if(frameCount%120==0){
    carrot=createSprite(480,250)
    carrot.addImage(carrotimg)
    carrot.velocityX=-6
    carrot.scale=0.5
    carrot1.add(carrot)
  }
}
//--------------------------------------fence()----------------------------------------------

function spawnFences(){
  if(frameCount%150==0){
    fence=createSprite(800,460)
    fence.addImage(fenceimg)
    fence.velocityX=-5
    fence.scale=0.6
    fence1.add(fence)
    //fence.debug=true
  }
}
//--------------------------------------apple()----------------------------------------------

function spawnApples(){
  if(frameCount%120==0){
    apple=createSprite(480,250)
    apple.addImage(appleimg)
    apple.velocityX=-6
    apple.scale=0.2
    apple1.add(apple)
  }
}
//---------------------------------meanLady()-----------------------------------------------
function spawnMeanLady(){
  if(frameCount%150==0){
    meanLady=createSprite(800,380)
    meanLady.addImage(meanLadyimg)
    meanLady.velocityX=-5
    meanLady.scale=0.8
    meanLady1.add(meanLady)
    //meanLady.debug=true
  }
}
////--------------------------------------bones()----------------------------------------------

function spawnBones(){
  if(frameCount%120==0){
    bone=createSprite(480,250)
    bone.addImage(boneimg)
    bone.velocityX=-6
    bone.scale=0.2
    bone1.add(bone)
  }
}

////--------------------------------------wolves()----------------------------------------------

function spawnWolves(){
  if(frameCount%150==0){
    wolf=createSprite(800,420)
    wolf.addImage(wolfimg)
    wolf.velocityX=-5
    wolf.rotation=25
    wolf.scale=0.9
    wolf1.add(wolf)
    //wolf.debug=true
  }
}
//---------------------------------------mushrooms()----------------------------------------------
function spawnMushroom(){
  if(frameCount%120==0){
    mushroom=createSprite(480,250)
    mushroom.addImage(mushroomimg)
    mushroom.velocityX=-6
    mushroom.scale=0.5
    mushroom1.add(mushroom)
  }
}
