//paramétrer la grille
let grille = 20;
let marge = 0;
let sound,amp,timeCode;
let affichage1 = false;
let affichage2 = true;
let affichage3 = false;
let affichage4 = false;
let temps =0;
let lissage = 0.02; //ralentir la vitesse de variation de la grille
//niveau de détail de la grille
let zoom =0.001;
let masque;
let fond;
let img;
let calque;
let poisson; 
let souris;
let fenetre;
let essaie;
let mur;
let texture;


function preload(){
  sound = loadSound('sound/UncleMilk-Conjungation.mp3')
  masque = loadImage('fish.png')
  img = loadImage ('ia.png')
  fond = loadImage('11.png')
  calque = loadImage ('ombre mer.png')
  poisson = loadImage('bleu.jpg')
  souris = loadImage('souris.png')
  fenetre = loadImage('fenetre (1).png')
  essaie = loadImage('essaie.png')
  mur = loadImage('mur.png')
  texture = loadImage('texture (12).png')
}


function setup() {
  colorMode(HSL)
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude();
  img.resize(width,height)
  masque.resize(width,height)
  fond.resize(width,height)
  calque.resize(width,height)
  poisson.resize(width,height)
  fenetre.resize(width,height)
  essaie.resize(width,height)
  mur.resize(width,height)
  texture.resize(width,height)
  pixelDensity(0.8)
}


//lecture de la musique
function mousePressed(){
  print(timeCode)//impression du time code

  let lecture = sound.isPlaying();
  if(lecture == false){
    sound.play()
  }  
}


function draw() {
  // print(amp.getLevel());
  blendMode(BLEND)
  background(255)

	if(sound.isPlaying()){
		timeCode = sound.currentTime(); ///time code actuel de la musique
  }

  // if(timeCode >=20){
  //   effect6();
  // }

  // if (timeCode >= 50){
  //   effect2();
  // }

    if(affichage2){ 
    effect2();
    effect17();

  }

  if(affichage3){
    effect6();
    effect11()
    effect18();
  }
  
  if(affichage4){ 
    effect13(); 
    effect20();
    effect1();
  }
}


function keyPressed(){
  affichage1 =false;
  affichage2 =false;
  affichage3 =false;
  affichage4 =false;
  if(key=='1'){
    affichage2 = !affichage2
  }

  if (key =='2'){
    affichage3 = !affichage3
  }

  if (key =='3'){
    affichage4 = !affichage4
  }
  }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//effet brush cadre
function effect1(){
      let level = amp.getLevel();
     
      temps = temps+level*lissage; 

    for (let x = marge; x <width-marge; x+=grille) {
    for (let y = marge; y<height-marge; y+=grille) {
 
         let paramX=x*zoom;
         let paramY =y*zoom;
         //ci dessous modifier les paramètres pour afficher des formes 
         let noise3d = noise(paramX,paramY,temps)*grille
        //  noStroke()
        //  fill(360,100,60)
        //  image (img,x*5,y*5)
      }
}
blendMode(BLEND)
image(calque,0,0)
}

//effet plusieurs couleurs
function effect2(){
    background(0)
     blendMode(BLEND)
    let level = amp.getLevel();
    temps = temps+level*lissage; 

    for (let x = marge; x <width-marge; x+=grille) {
    for (let y = marge; y<height-marge; y+=grille) {
 
//  // Vérifie le masque
//             let maskPixel = masque.get(x, y); // [r,g,b,a]
//             if(maskPixel[3] < 50) continue;  // pixel transparent → on saute

         let paramX=x*zoom;
         let paramY =y*zoom;
         //ci dessous modifier les paramètres pour afficher des formes 
         let noise3d = noise(paramX,paramY,temps)*grille*0.5
let filtre = noise(paramX,paramY,temps)
  ///accumulation de condition en fonction du résultat
      if(filtre>0.7){
        fill(119,100,60)
        ellipse(x,y,grille*5)
      }else if(filtre>0.5){
        fill(17, 100, 60,)
        ellipse(x,y,grille)
      }else if(filtre>0.4){
        fill(122,100,60)
        textSize(40)
        text('@',x,y)
        fill(331,100,47.3,0.5)
        ellipse(x,y,grille)
      }else if(filtre>0.2){
        fill(119,100,60)
        ellipse(x,y,noise3d)
      }
}
}
// blendMode(REMOVE)
// image(calque,0,0)
}

//effet brush mouvements
function effect3(){
    let level = amp.getLevel();
     temps = temps+level*lissage; 
    blendMode(BLEND)
    stroke(0)
    
    for (let x = marge; x <width-marge; x+=grille) {
   for (let y = height-marge; y > height*0.4; y -= grille) {
    
       // Vérifie le masque
  //           let maskPixel = texture.get(x, y); // [r,g,b,a]
  //           if(maskPixel[3] < 50) continue;  // pixel transparent → on saute
  //  // let noise3d = noise(x*zoom,y*zoom,temps)*2

    let filtre = noise (x*zoom,y*zoom, temps)///valeurs entre 0 et 1

         if(filtre>0.5){
            blendMode(REMOVE)
            noStroke()
            image(texture,x,y)
         }

}}

}

//effet grille colorée
function effect4(){
      let level = amp.getLevel();
     
      temps = temps+level*lissage; 

     for (let x = marge; x <width-marge; x+=grille) {
      for (let y = marge; y<height-marge; y+=grille) {
 
         let paramX=x*zoom;
         let paramY =y*zoom;
         //ci dessous modifier les paramètres pour afficher des formes 
         let noise3d = noise(paramX,paramY,temps)*360
         fill(noise3d,100,60)
       square(x,y,grille)
      }
 }
}

//effet carrée masque
function effect5(){
    let level = amp.getLevel();
        temps = temps+level*lissage; 

    for (let x = marge; x <width+marge; x+=grille) {
    for (let y = marge; y<height+marge; y+=grille) {

    let maskPixel = essaie.get(x, y); // [r,g,b,a]
    if(maskPixel[3] < 50) continue;  // pixel transparent → on saute
 
         let paramX=x*zoom;
         let paramY =y*zoom;

     let noise3d = noise(paramX,paramY,temps)*0.5
      push()
      translate(x,y)
      rotate(noise3d*10)
      noStroke()
	    fill(291,100,32.2)
	    square(5,5,grille)
      pop()
}}
}

//effet ligne vertical
function effect6(){
  background(0)
    let ecart = 300; // modifier cette variable pour avoir de plus grandes variations
let level = amp.getLevel();
   temps+=level*lissage;
//    background(255)
  fill(291,100,32.2);
  strokeWeight(5);
  stroke(0,0,100); 

 for (let x = marge; x <width-marge; x+=grille) {
    beginShape() // on crée une forme par ligne 
    for (let y = marge; y <height-marge; y+=grille) {

       
        let paramX=x*zoom;
        let paramY =y*zoom;
        let noise3d = noise(paramX,paramY,temps)
       noise3d = map(noise3d,0,1,ecart*-1,ecart) //obtenir des valeurs négatives et positives
      
     if(noise3d>0.5 || y>height-grille-marge || y==marge){
       
            vertex(x+noise3d,y) // desssiner chaque points de la ligne
     }
 }
endShape()
 }

    fill(243,100,36.5);
  strokeWeight(1);
  stroke(0, 0, 100);
   //background(255)

 for (let y = marge; y <height-marge; y+=grille) {
    beginShape()
    for (let x = marge; x<width-marge; x+=grille) {
      

       let paramX=x*zoom;
       let paramY =y*zoom;
       let noise3d = noise(paramX,paramY,temps)//obtenir des valeurs négatives et positives
       noise3d = map(noise3d,0,1,ecart*-1,ecart)
      
     if(noise3d>0.5 || x>width-grille-marge-0.5 || x==marge){
            vertex(x,y+noise3d)// desssiner chaque points de la ligne
     }
 }
endShape()
 }
}

//effet ligne horizontal
function effect7(){ 
    let ecart = 200;// modifier cette variable pour avoir de plus grandes variations
let level = amp.getLevel();
   temps+=level*lissage;
    fill(121,100,60);
  strokeWeight(1);
  stroke(0, 0, 100);
   //background(255)

 for (let y = marge; y <height-marge; y+=grille) {
    beginShape()
    for (let x = marge; x<width-marge; x+=grille) {
      
    let maskPixel = masque.get(x, y); // [r,g,b,a]
    if(maskPixel[3] < 50) continue;  // pixel transparent → on saute

       let paramX=x*zoom;
       let paramY =y*zoom;
       let noise3d = noise(paramX,paramY,temps)//obtenir des valeurs négatives et positives
       noise3d = map(noise3d,0,1,ecart*-1,ecart)
      
     if(noise3d>0.5 || x>width-grille-marge-0.5 || x==marge){
            vertex(x,y+noise3d)// desssiner chaque points de la ligne
     }
 }
endShape()
}
}

//effet cadre et ellipse
function effect8(){
      let level = amp.getLevel();
     
      temps = temps+level*lissage; 

    for (let x = marge; x <width-marge; x+=grille) {
    for (let y = marge; y<height-marge; y+=grille) {
 
         let paramX=x*zoom;
         let paramY =y*zoom;
         //ci dessous modifier les paramètres pour afficher des formes 
         let noise3d = noise(paramX,paramY,temps)*grille*2
         noStroke()
        fill(360,100,60)
        // fill(255)
        // textSize(40)
       ellipse(x,y,noise3d)
      }
 }
 image(img,0,0)
}




//effet ligne sacadées
function effect11(){
    let level = amp.getLevel();
     
    temps = temps+level*lissage; 

  stroke(177,100,60)
  for (let x = marge; x <width-marge; x+=grille) {
      for (let y =marge; y<height-marge; y+=grille) {
       
         let paramX=x*zoom;
         let paramY =y*zoom;

         let noise3d = noise(paramX,paramY,temps)*360
         
         let filtre = noise3d/360
         if(filtre>0.5){
            // fill(360,50,50)
            // ellipse(x,y,grille)
         }
         strokeWeight(2)
         push()
         translate(x,y)
         rotate(noise3d*0.001)
         line(0,0,0,grille*10)
         //square(0,0,grille)
         pop() 
      }
 }
 image(fenetre,0,0)
}

//effet 2 mais avec autre formes dont ligne
function effect12(){
    let level = amp.getLevel();
     
    temps = temps+level*lissage; 

  stroke(0)
  for (let x = marge; x <width-marge; x+=grille) {
      for (let y =marge; y<height-marge; y+=grille) {
       
         let paramX=x*zoom;
         let paramY =y*zoom;

         let noise3d = noise(paramX,paramY,temps)*360
         
         let filtre = noise3d/360

         if(filtre>0.5){
            strokeWeight(2)
         push()
         translate(x,y)
         rotate(noise3d)
         line(0,0,0,grille*2)
         //square(0,0,grille)
         pop()
         }else if(filtre>0.4){
          fill(150,50,50)
            text('A',x,y)
         }else{
          fill(200,50,50)
            ellipse(x,y,grille)
         }
         


         
      }
   
 }
}

//effet poisson
function effect13(){


     let level = amp.getLevel();
     
    temps = temps+level*lissage; 
 image(img,0,0)
  image(poisson,0,0)
  for (let x = marge; x <width-marge; x+=grille) {
      for (let y =marge; y<height-marge; y+=grille) {
       
         let paramX=x*zoom;
         let paramY =y*zoom;

        //  let noise3d = noise(paramX,paramY,temps)*360
         
         let filtre = noise(paramX,paramY,temps)///valeurs entre 0 et 1

         if(filtre>0.5){
          blendMode(REMOVE)
          noStroke()
          ellipse(x,y,grille)
         }else if (filtre < 0.5){
            let noise3d = noise(x*zoom,y*zoom,temps)*40
            blendMode(REMOVE)
            fill(150,100,60,random(1)*level)    
            ellipse(random(x),random(y),noise3d*level)
         }else if (filtre <0.5){
        }
      }
        // for (let x = -marge; x < width - marge; x+=300) {
        // for (let y = -marge; y < height-marge; y+=300) {

        //   noFill()
        //   stroke(195,100,60)
        //   strokeWeight(50*level)
        //  ellipse(x,y,50,50,random(grille))

        //   noFill()
        //   stroke(121,100,50.3)
        //   strokeWeight(100*level)
        //  ellipse(x,y,280,280,random(grille))

        //   noFill()
        //   stroke(12,100,60)
        //   strokeWeight(170*level)
        //  circle(x,y,170,170,random(grille))

        // noFill()
        //   stroke(354,100,60)
        //   strokeWeight(10*level)
        //  circle(x,y,10,10,random(grille))
        //  }}
 }
  blendMode(BLEND)
 image(img,0,0)
blendMode(REMOVE)
 image(masque,0,0)

}




//effet masque "bulle" en plus d'etre compatible avec les autre effets
function effect15(){
    let level = amp.getLevel();
   temps = temps+level*lissage;

    blendMode(BLEND)
    stroke(0)
    image(masque,0,0)
  for (let x = marge; x <width-marge; x+=grille) {
      for (let y =marge; y<height-marge; y+=grille) {


   // let noise3d = noise(x*zoom,y*zoom,temps)*2


    let filtre = noise (x*zoom,y*zoom, temps)///valeurs entre 0 et 1

         if(filtre>0.5){
            blendMode(REMOVE)
            noStroke()
            ellipse(x,y,grille)
         }
         
}
}
blendMode(REMOVE)
image(masque,0,0)
}



// effet guimauve
function effect17() {


    let level = amp.getLevel();
    
 temps= temps+level*lissage;


    // background (0,0,0)

    for (let x = 70; x < width - 70; x+=15) {
        for (let y = 70; y < height-70; y+=15) {
        // fill(random(255),random(255),random(255))

            // let color = noise(frameCount*0.01)*360
            // fill(color,50,50)

            noStroke() 
            let noise3d = noise(mouseX/30+x*zoom*mouseY/30+y*zoom+frameCount*0.05)*150
            // let noise3d = noise(mouseX/30+x*zoom,mouseY/30+y*zoom)*40
            // let noise3d = noise(x*zoom,y*zoom,temps)*50

            fill(noise3d*1,100,78.9,0.1)            
            ellipse(x*10,y,noise3d*10)
            // (x,y,s)
    // text('Hello',x,y)

    // let txt = int(random(10))

    // text(txt,x,y)
 }
}
}

//sphere souris
function effect18() {

let level = amp.getLevel();
   temps = temps+level*lissage;
for (let x = marge; x <width-marge; x+=grille) {
      for (let y =marge; y<height-marge; y+=grille) {
       
         let paramX=x*zoom;
         let paramY =y*zoom;

        // let noise3d = noise(paramX,paramY,temps)*121

            noStroke() 
            // let noise3d = noise(mouseX/30+x*zoom*mouseY/30+y*zoom+frameCount*0.05)*150
            // let noise3d = noise(mouseX/30+x*zoom,mouseY/30+y*zoom)*40

            // fill(noise3d*1,65,78.9)  
            // stroke(121,100,60,level*0.5)
            // strokeWeight(400*level)         
            // point(mouseX,mouseY)

            // fill(121,100,60)*level
            // noStroke()
            // ellipse(mouseX,mouseY,30,30)

        //   noFill()
        //   stroke(12,100,60)
        //   strokeWeight(20*level)
        //  ellipse(mouseX,mouseY,20,20)

        //   noFill()
        //   stroke(79,100,60)
        //   strokeWeight(20*level)
        //  ellipse(mouseX,mouseY,5,5)

        //   noFill()
        //   stroke(0,100,60)
        //   strokeWeight(20*level)
        //  ellipse(mouseX,mouseY,50,50)

          // noFill()
          // stroke(121,100,60)
          // strokeWeight(20*level)
         image(souris,mouseX,mouseY,200*level,200*level)
}
}
}

function effect19(){
  let level = amp.getLevel();
    
 temps= temps+level*lissage;

    for (let x = -marge; x < width - marge; x+=15) {
        for (let y = -marge; y < height-marge; y+=15) {

            // noStroke() 
            // let noise3d = noise(mouseX/30+x*zoom*mouseY/30+y*zoom+frameCount*0.05)*150

// let noise3d = noise(x*zoom,y*zoom,temps)
//let noise3d = noise(mouseX/30+x*zoom,mouseY/30+y*zoom)*40


            fill(195,100,60)
            noFill()
            stroke(195,100,60)
            strokeWeight(10*level)
          ellipse(random(x),random(y),random(grille))

          noFill()
          stroke(79,100,60)
          strokeWeight(10*level)
         ellipse(random(x),random(y),random(grille))

        //   noFill()
        //   stroke(0,100,60)
        //   strokeWeight(10*level)
        //  ellipse(random(mouseX),random(mouseY),random(grille))


        //   noFill()
        //   stroke(354,100,60)
        //   strokeWeight(200*level)
        //  circle(x,y,80*grille,80*grille)
}}
}

function effect20(){
  let level = amp.getLevel();
    
 temps= temps+level*lissage;

    for (let x = -marge; x < width - marge; x+=300) {
        for (let y = -marge; y < height-marge; y+=300) {

          noFill()
          stroke(195,100,60)
          strokeWeight(50*level)
         ellipse(x,y,50,50,random(grille))

          noFill()
          stroke(121,100,50.3)
          strokeWeight(100*level)
         ellipse(x,y,280,280,random(grille))

          noFill()
          stroke(12,100,60)
          strokeWeight(170*level)
         circle(x,y,170,170,random(grille))

        noFill()
          stroke(354,100,60)
          strokeWeight(10*level)
         circle(x,y,10,10,random(grille))

}}
}

function effect21(){

  let level = amp.getLevel();
  temps+= temps+level*lissage;

  for (let x = 70; x < width - 70; x+=50) {
  for (let y = 70; y < height-70; y+=50) {

  // let s = noise(x*y+frameCount*0.02)*148
  // let s = noise(mouseX/30+x*zoom,mouseY/30+y*zoom)*40
  let noise3d = noise(x*zoom,y*zoom,temps)*40

  fill(150,100,60,random(1)*level)
  // stoke(150,100,60,random(1))
  // strokeWeight(10*level)         
  ellipse(x,y,noise3d*level)
    // (x,y,s)
    // text('01',x,y,noise3d)

    // let txt = int(random(10))

    // text(txt,x,y)
}
}
}

function effect22(){
      let level = amp.getLevel();
     
      temps = temps+level*lissage; 

    for (let x = marge; x <width-marge; x+=grille) {
    for (let y = marge; y<height-marge; y+=grille) {
 
         let paramX=x*zoom;
         let paramY =y*zoom;
         //ci dessous modifier les paramètres pour afficher des formes 
        // let noise3d = noise(paramX,paramY,temps)*grille
        //  noStroke()
        //  fill(360,100,60)
        //  image (img,x*5,y*5)
      }
}
blendMode(BLEND)
image(calque,0,0)
}

//effets pas de moi mais pour s'inspirer
function effect101(){
    let level = amp.getLevel();
    temps += level * 0.08; // douceur de variation

    blendMode(BLEND);
    noStroke();

    for (let x = marge; x < width - marge; x += grille) {
        for (let y = marge; y < height - marge; y += grille) {

 // 1️⃣ Vérifie le masque
            let maskPixel = masque.get(x, y); // [r,g,b,a]
            if(maskPixel[3] < 50) continue;  // pixel transparent → on saute

            let paramX = x * zoom;
            let paramY = y * zoom;

            // noise de base
            let filtre = noise(paramX, paramY, temps);

            // étirement horizontal ou vertical
            let stretch = map(filtre, 0, 1, -50, 50) * (1 + level*5);

            // couleur glitch
            fill(
                (filtre * 360 + temps*40) % 360,
                100,
                50 + level * 20
            );

            // choisir si on “glitch” en horizontal ou vertical selon noise
            if (filtre > 0.6) {
                // étirement horizontal
                rect(x, y, grille + stretch, grille);
            } else {
                // étirement vertical
                rect(x, y, grille, grille + stretch);
            }

            // option : ajouter la texture si tu veux
            if (filtre > 0.75){
                push();
                blendMode(ADD);
                image(img, x, y, grille, grille);
                pop();
            }
        }
    }
}
function effect51(){
    let level = amp.getLevel();
    temps += level * 0.1;

    blendMode(BLEND);
    noStroke();

    // centre d'attraction/magnétisme
    let centreX = width / 2;
    let centreY = height / 2;

    for (let x = marge; x < width - marge; x += grille) {
        for (let y = marge; y < height - marge; y += grille) {

            // position initiale du point
            let dx = x - centreX;
            let dy = y - centreY;
            let dist = sqrt(dx * dx + dy * dy);

            // noise pour donner du mouvement organique
            let n = noise(x * zoom, y * zoom, temps);

            // force magnétique (attire ou repousse selon noise)
            let force = map(n, 0, 1, -40, 40) * (1 + level * 5);

            // nouvelle position
            let newX = x + (dx / dist) * force;
            let newY = y + (dy / dist) * force;

            // couleur
            fill(
                (n * 360 + temps * 20) % 360,
                100,
                55 + level * 30
            );

            ellipse(newX, newY, grille * 0.7);
        }
    }
}
function effect49(){
    let level = amp.getLevel();
    temps += level * 0.02;

    blendMode(BLEND);
    noStroke();

    for(let x = marge; x < width-marge; x += grille){
        for(let y = marge; y < height-marge; y += grille){
            let n = noise(x*0.01, y*0.01, temps);
            let taille = grille * (0.5 + n*0.5 + level*0.5);

            fill((n*360 + temps*30) % 360, 100, 60);
            rect(x, y, taille, taille);
        }
    }
}


//effet cool mais jsp
function effect85(){ 
    let level = amp.getLevel();
    temps= temps+level*lissage*5;

    blendMode(BLEND);
    noStroke();

    for (let x = marge; x < width - marge; x += grille){
        for (let y = marge; y < height - marge; y += grille){
            let noise3d = noise (x * zoom, y * zoom, temps)*360; // pour un mouvement organique
            let taille = grille * (0.5 + noise3d * 0.5 + level); // taille pulsante

            // couleur dynamique
            // fill(
            //     (noise3d * 360 + temps * 30) % 12,
            //     100,
            //     60
            // );
            fill(0,0,0+(noise3d)%100)

            rect(x, y, taille,taille);
        }
    }

}
