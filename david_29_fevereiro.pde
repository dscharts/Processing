void setup() {
  size(700, 700);
  rectMode(CENTER);
}

void draw() {
  background(40);
  bola();
  raqueta();
  raqueti();
  placar();
}

int bolaPos = 350;
int bolaX = bolaPos;
int bolaY = bolaPos;

int speed = 2;
int speedY = speed;
int speedX = speed;

int ypos =  350;
int raquetaY = ypos;
int raquetiY = ypos;

int pointP1 = 0;
int pointP2 = 0;

int raqueteA = 30;
int raqueteL = 130;

void bola() {
   bolaX = bolaX + speedX;
   bolaY = bolaY + speedY;
   
   if (bolaY <= 0 || bolaY >= height) {
     speedY = speedY * -1;
   }
   
   if (bolaX <= 0) {
    speedX = speedX * -1;
     bolaX = bolaPos;
     bolaY = bolaPos;
     pointP2 += 1;
   }
   
   if (bolaX >= width) {
    speedX = speedX * -1;
    bolaX = bolaPos;
    bolaY = bolaPos;
    pointP1 += 1;
   }
   
   ellipse(bolaX,bolaY,20,20);
}

void raqueta() {
  if (keyPressed) {
    if (key == 'W' || key == 'w') {
      raquetaY = raquetaY - 5;
    } if (keyCode == 'S' || key == 's') {
      raquetaY = raquetaY + 5;
    }
  }
  rect(20,raquetaY,raqueteA,raqueteL);
}

void raqueti() {
  if (keyPressed) {
    if (keyCode == UP) {
      raquetiY = raquetiY - 5;
    } if (keyCode == DOWN) {
      raquetiY = raquetiY + 5;
    }
  } 
  rect(680,raquetiY,raqueteA,raqueteL);
}

void placar() {
  textSize(36);
  text(pointP1, 50, 40);
  text(pointP2, 650, 40);
}
