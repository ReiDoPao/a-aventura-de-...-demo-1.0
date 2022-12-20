//entidades
var boneco,boneco_parado, boneco_correndo;
var monstro,mosntroImg;

//estrutura e colisão
var chao,chao2,chaoImg;
var chaoMal, chaoMalImg;
var chaoColisao, chaoColisao2, chaoColisao3;
var jump,jumpImg;

//extras
var vida = 3;
var vidaMonstro = 1;
var isMoviment = false;
var iniciar = 0;

function preload (){
  boneco_parado = loadImage("assets/Sprite teste.png");
  boneco_correndo = loadImage("assets/Sprite corre.png");
  chaoImg = loadImage("assets/TexturaChão.png");
  chaoMalImg = loadImage("assets/TexturaChão3.png");
  jumpImg = loadImage("assets/Jump.png");
}


function setup() {
  createCanvas(1600,1600);
  chaoGrupo = new Group();
  
  //entidades
  boneco = createSprite(100,100,10,10);
  boneco.addImage(boneco_parado);
  boneco.scale = 0.03;

  monstro = createSprite(800,1500,7,7);
 
  //chãos
for (c=0; c<=12; c++){
    chao = createSprite(28+64*c,390,64,64);
    chao.addImage(chaoImg);
    chaoGrupo.add(chao);
  }

for (i=0; i<=12; i++){
  chao2 = createSprite(1000+64*i,700,64,64);
  chao2.addImage(chaoImg);
  chaoGrupo.add(chao2);
}

for (i=0; i<=28; i++){
  chaoMal = createSprite(28+64*i,1500,64,64);
  chaoMal.addImage(chaoMalImg);
  chaoGrupo.add(chaoMal);
}

 
  chaoGrupo.debug = true;
  //console.log(chao);
  

  chaoColisao = createSprite(400,374,800,19);
  chaoColisao.visible = false;

  chaoColisao2 = createSprite(1369,678,800,19);
  chaoColisao2.visible = false;

  chaoColisao3 = createSprite(800,1480,1600,10);
  chaoColisao3.visible = false;

  jump = createSprite(1000,635,30,30);
  jump.addImage(jumpImg);


  //boneco.debug = true; 
}

function draw() 
{
  background(51);
  boneco.collide(chaoColisao);
  boneco.collide(chaoColisao2);
  boneco.collide(chaoColisao3);



//Texto indicativo
fill('white');
textSize(20);
text('<-- pule aqui dentro', 1030, 650);
text('•Setinhas para andar', 80, 100);
text('•Espaço para pular', 80, 150);
text('•K para resetar o personagem', 80, 200);
text('⇦ ⇨', 325, 100);
text('⇧', 342, 90);
text('⇩', 342, 110);
text('▂▂▂▂▂▂',320, 150);
text('cuidado, lá embaixo terá', 300, 600);
textSize(30);
text('Monstros!', 360, 640);
textSize(50);
text('⇩',270,630);


if (iniciar === 0){
textSize(40);
text('Presione espaço para iniciar',400, -300); 
}


  //movimentos

  if (keyIsDown(RIGHT_ARROW)){
   boneco.x = boneco.x + 8;
   isMoviment = true;
  }
  if (keyIsDown(LEFT_ARROW)){
    boneco.x = boneco.x - 8;
    isMoviment = true;
   }
   if (keyWentUp(RIGHT_ARROW) || keyWentUp(LEFT_ARROW)){
    isMoviment = false;
   }
  if (keyDown("space") && boneco.isTouching(chaoGrupo)){
  boneco.velocityY = boneco.velocityY - 15;
  iniciar += 1;
  }
 
  //Jump
  if (boneco.isTouching(jump)){
    boneco.velocityY = boneco.velocityY - 10;
  }
  
  
  // lapidar

  camera.position.y = boneco.y - 200;

  if (isMoviment == true){
    boneco.addImage(boneco_correndo);
  }

  if(isMoviment == false){
    boneco.addImage(boneco_parado);
  }


  console.log(isMoviment);
  console.log(iniciar);

  //reset do boneco

  if (keyDown("k")){
  boneco.x = 400;
  boneco.y = 200; 
  }

  //gravidade
  boneco.velocityY = boneco.velocityY + 0.8;

boneco.depth = chao.depth;
boneco.depth = boneco.depth + 1;

 
  drawSprites();


}
