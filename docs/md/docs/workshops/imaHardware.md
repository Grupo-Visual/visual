# Imágenes con shaders

[Volver al informe](/docs/workshops/informeHardware)

- Promedio aritmético RGB
- Negativo
- Luma

> :Tabs
> > :Tab title=Resultado
> > 
> > > :Formula align=center
> >
> > > :P5 sketch=/docs/sketches/ProNegLumaHardware.js, width=700, height=550
>
> > :Tab title=P5.js
> >
> > 
> > > ```javascript
> > >let theShader;
> > >let img;
> > >let sel;
> > >var opcion = 1;
> > >
> > >function preload(){
> > >  theShader = loadShader('/visual/docs/sketches/shaders/paraTodos.vert','/visual/docs/sketches/shaders/imaProNegLuma.frag');
> > >  img = loadImage("/visual/docs/sketches/lenna.png");
> > >}
> > >function setup() {
> > >  createCanvas(700, 550, WEBGL);
> > >  sel = createSelect();
> > >  sel.position(620, 20);
> > >  sel.option('Promedio');
> > >  sel.option('Negativo');
> > >  sel.option('Luma');
> > >  sel.changed(function () {
> > >    let val = sel.value();
> > >    if(val == 'Promedio'){
> > >      opcion = 1;
> > >    } else if(val == 'Negativo'){
> > >      opcion = 2;
> > >    } else if(val == 'Luma'){
> > >      opcion = 3; 
> > >    }
> > >  });
> > >  textureMode(NORMAL);
> > >  shader(theShader);
> > >  theShader.setUniform("img", img);
> > >  background(0);
> > >  noStroke();
> > >}
> > >function draw() {
> > >  theShader.setUniform("opcion", opcion);
> > >  beginShape();
> > >  vertex(-width/2, -height/2, 0, 0);
> > >  vertex(width/2, -height/2, 1, 0); 
> > >  vertex(width/2, height/2, 1, 1); 
> > >  vertex(-width/2, height/2, 0, 1); 
> > >  endShape(CLOSE);
> > >}
> > > ```
>
> > :Tab title=.frag
> >
> >
> > > ```c
> > >precision mediump float;
> > >uniform sampler2D img;
> > >uniform int opcion;
> > >
> > >varying vec4 vVertexColor;
> > >vec4 textureColor;
> > >float pro;
> > >float luma;
> > >
> > >varying vec2 vTexCoord;
> > >void main() {
> > >  textureColor = texture2D(img, vTexCoord);
> > >  if(opcion == 2){
> > >    textureColor.r = 1.0-textureColor.r;
> > >    textureColor.g = 1.0-textureColor.g;
> > >    textureColor.b = 1.0-textureColor.b;
> > >    textureColor.a = 1.0;
> > >  }else if (opcion == 1){
> > >    pro = (textureColor.r + textureColor.g + textureColor.b)/3.0;
> > >    textureColor.r = pro;
> > >    textureColor.g = pro;
> > >    textureColor.b = pro;
> > >    textureColor.a = 1.0;
> > >  }else{
> > >    luma = textureColor.r*0.2989 + textureColor.g*0.5870 + textureColor.b*0.1140;
> > >    textureColor.r = luma;
> > >    textureColor.g = luma;
> > >    textureColor.b = luma;
> > >    textureColor.a = 1.0;
> > >  }
> > >  gl_FragColor = textureColor * vVertexColor;  
> > >}
> > > ```

- Convoluciones

> :Tabs
> > :Tab title=Resultado
> > 
> > > :Formula align=center
> >
> > > :P5 sketch=/docs/sketches/ConvHardware.js, width=700, height=600
>
> > :Tab title=P5.js
> >
> > 
> > > ```javascript
> > >let img;
> > >let sha;
> > >let identidad;
> > >let borde;
> > >let agu;
> > >let boxBlur;
> > >let gaussBlur;
> > >let colores;
> > >var siColor = false;
> > >var kernel = [0, 0, 0, 0, 1, 0, 0, 0, 0];
> > >function preload(){
> > >  sha = loadShader('/visual/docs/sketches/shaders/paraTodos.vert','/visual/docs/sketches/shaders/imaConv.frag');
> > >  img = loadImage("/visual/docs/sketches/lenna.png");
> > >}
> > >function setup() {
> > >  createCanvas(700, 550, WEBGL);
> > >  idetindad = createButton('Identity');
> > >  idetindad.position(10, 570);
> > >  idetindad.mousePressed(function () { 
> > >    let aux = [0, 0, 0, 0, 1, 0, 0, 0, 0];
> > >    kernel = aux;
> > >  });
> > >  borde = createButton('Edge detection');
> > >  borde.position(80, 570);
> > >  borde.mousePressed(function () {
> > >    let aux = [-1.0,-1.0,-1.0,-1.0,8.0,-1.0,-1.0,-1.0,-1.0];
> > >    kernel = aux;
> > >  });
> > >  agu = createButton('Sharpen');
> > >  agu.position(195, 570);
> > >  agu.mousePressed(function () {
> > >    let aux = [0.0,-1.0,0.0,-1.0,5.0,-1.0,0.0,-1.0,0.0];
> > >    kernel = aux;
> > >  });
> > >  boxBlur = createButton('Box blur');
> > >  boxBlur.position(270, 570);
> > >  boxBlur.mousePressed(function () {
> > >    let aux = [(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9)];
> > >    kernel = aux;
> > >  });
> > >  gaussBlur = createButton('Gaussian blur');
> > >  gaussBlur.position(345, 570);
> > >  gaussBlur.mousePressed(function () {
> > >    let aux = [(1/16),(2/16),(1/16),(2/16),(4/16),(2/16),(1/16),(2/16),(1/16)];
> > >    kernel = aux;
> > >  });
> > >  colores = createButton('Colors');
> > >  colores.position(645, 570);
> > >  colores.mousePressed(function () {
> > >    siColor = !siColor;
> > >  });
> > >  textureMode(NORMAL);
> > >  shader(sha);
> > >  sha.setUniform("offSet", [1.0/img.width, 1.0/img.height]);
> > >  sha.setUniform("img", img);
> > >  background(0);
> > >  noStroke();
> > >}
> > >function draw() {  
> > >  sha.setUniform("kernel", kernel);
> > >  beginShape();
> > >  siColor ? fill(255,255,0) : fill(255,255,255);
> > >  vertex(-width/2, -height/2, 0, 0);
> > >  siColor ? fill(0,0,255) : fill(255,255,255);
> > >  vertex(width/2, -height/2, 1, 0);
> > >  siColor ? fill(200,0,0) : fill(255,255,255); 
> > >  vertex(width/2, height/2, 1, 1); 
> > >  siColor ? fill(120,60,255) : fill(255,255,255);
> > >  vertex(-width/2, height/2, 0, 1); 
> > >  endShape(CLOSE);
> > >}
> > > ```
>
> > :Tab title=.frag
> >
> >
> > > ```c
> > > precision mediump float;
> > > 
> > > uniform sampler2D img;
> > > uniform vec2 offSet;
> > > uniform float kernel[9];
> > > 
> > > varying vec4 vVertexColor;
> > > varying vec2 vTexCoord;
> > > void main() {
> > > 
> > > vec2 tc[9];
> > > 
> > > vec4 convolution = vec4(0.0,0.0,0.0,1.0);
> > > 
> > > tc[0] = vec2(-offSet.s, +offSet.t);
> > > tc[1] = vec2(0.0,       +offSet.t);
> > > tc[2] = vec2(+offSet.s, +offSet.t);
> > > tc[3] = vec2(-offSet.s,       0.0);
> > > tc[4] = vec2(0.0, 0.0);
> > > tc[5] = vec2(+offSet.s,       0.0);
> > > tc[6] = vec2(-offSet.s, -offSet.t);
> > > tc[7] = vec2(0.0,       -offSet.t);
> > > tc[8] = vec2(+offSet.t, -offSet.t);
> > > for(int i = 0; i < 9; i++){
> > > convolution += texture2D(img, vTexCoord + tc[i]) * kernel[i];
> > > }
> > > gl_FragColor = convolution * vVertexColor;  
> > > }
> > > ```



- Arte ASCII

> :Tabs
> > :Tab title = Original
> >
> > > :Formula align=center
> >
> > > ![imagen204](/docs/sketches/images/mosaico/gato_mosaico.jpg)
>
> > :Tab title=Resultado
> >
> > > :Formula align=center
> >
> > > :P5 sketch=/docs/sketches/ascii.js, width=600, height=651
>
> > :Tab title=AsciiArtHardware.js
> >
> >  
> > >```js
> > >let ashader;
> > >let image;
> > >let symbol = [];
> > >
> >>let symbols = [
> >>    "/visual/docs/sketches/images/ascii/1.png",
> >    >    "/visual/docs/sketches/images/ascii/1.png",
> >   >     "/visual/docs/sketches/images/ascii/2.png",
> >    >    "/visual/docs/sketches/images/ascii/3.png",
> >    >     "/visual/docs/sketches/images/ascii/4.png",
> >    >    "/visual/docs/sketches/images/ascii/5.png",
> >    >     "/visual/docs/sketches/images/ascii/6.png",
> >    >     "/visual/docs/sketches/images/ascii/7.png",
> >    >     "/visual/docs/sketches/images/ascii/8.png",
> >    >    "/visual/docs/sketches/images/ascii/9.png",
> >    >      "/visual/docs/sketches/images/ascii/10.png",
> >    >    "/visual/docs/sketches/images/ascii/11.png",
> >    >    "/visual/docs/sketches/images/ascii/12.png",
> >    >     "/visual/docs/sketches/images/ascii/13.png",
> >    >     "/visual/docs/sketches/images/ascii/14.png",
> >    >     "/visual/docs/sketches/images/ascii/15.png",
> >    >     "/visual/docs/sketches/images/ascii/16.png",
> >    >     "/visual/docs/sketches/images/ascii/17.png",
> >    >     "/visual/docs/sketches/images/ascii/18.png",
> >    >     "/visual/docs/sketches/images/ascii/19.png",
> >    >     "/visual/docs/sketches/images/ascii/20.png",
> >    >     "/visual/docs/sketches/images/ascii/21.png",
> >    >    "/visual/docs/sketches/images/ascii/22.png",
> >  >    "/visual/docs/sketches/images/ascii/23.png",
> >  >    "/visual/docs/sketches/images/ascii/24.png",
> > >    "/visual/docs/sketches/images/ascii/25.png",
> > >        "/visual/docs/sketches/images/ascii/26.png",
> >    >     "/visual/docs/sketches/images/ascii/27.png"
> >    >     ]
> >    > 
> >    >     function preload() {
> >    >     image = loadImage('/visual/docs/sketches/images/ascii/gato_mosaico.jpg');
> >    >         for (let i = 1; i < 28; i++) {
> >    >         symbol[i] = loadImage(symbols[i]);
> >    >         }
> >    >     ashader = loadShader('/visual/docs/sketches/shaders/paraTodos.vert', '/visual/docs/sketches/shaders/photomosaic.frag');
> >    >}
> >    >
> >  >
> >  >function setup() {
> > >    createCanvas(600, 600, WEBGL);
> >    >     textureMode(NORMAL);
> >    >         noStroke();
> >    >         shader(ashader);
> >    >         ashader.setUniform('image', image);
> >    >         for (let i = 1; i < Object.keys(symbol).length; i++) {
> >    >             ashader.setUniform('symbol' + i, symbol[i]);
> >    >     }
> >    >     ashader.setUniform('resolution', 400);
> >    >    console.log("Hola");
> >    >}
> >  >
> >  >
> > >function draw() {
> > >     background(33);
> >    >     beginShape();
> >    >     vertex(-width / 2, -height / 2, 0, 0, 0);
> >    >     vertex(width / 2, -height / 2, 0, 1, 0);
> >    >     vertex(width / 2, height / 2, 0, 1, 1);
> >    >     vertex(-width / 2, height / 2, 0, 0, 1);
> >    >     endShape();
> >    > }
> > 
> > 
>
> > :Tab title=.frag
> >
> >
> > > ```c
> > > precision mediump float;
> > > 
> > > uniform sampler2D image;
> > > uniform sampler2D symbol1, symbol2, symbol3, symbol4, symbol5, symbol6, symbol7, symbol8, symbol9, symbol10, symbol12, symbol11, symbol13, symbol14, symbol15, symbol16, symbol17, symbol18, symbol19, symbol20, symbol21, symbol22, symbol23, symbol24, symbol25, symbol26, symbol27;
> > > 
> > > uniform float resolution;
> > > 
> > > 
> > > varying vec4 vVertexColor ;
> > > 
> > > varying vec2 vTexCoord;
> > > 
> > > void main(){
> > > 
> > > vec2 symbolCoord = vTexCoord * resolution;
> > > vec2 imageCoord = floor(symbolCoord);
> > > 
> > > symbolCoord = symbolCoord - imageCoord;
> > > 
> > > imageCoord =  imageCoord * vec2(1.0)/ vec2(resolution);
> > > 
> > > vec4 color = texture2D(image, imageCoord) * vVertexColor;
> > > float grayColor = (color.r*0.2126 + color.g*0.7152 + color.b*0.0722);
> > > 
> > > 
> > > 
> > >   if(grayColor < 0.05){
> > >     color = texture2D(symbol1, symbolCoord);
> > >   }else if(0.05 < grayColor && grayColor < 0.1){
> > >     color = texture2D(symbol2, symbolCoord);
> > >   }else if(0.1 < grayColor && grayColor < 0.15){
> > >     color = texture2D(symbol3, symbolCoord);
> > >   }else if(0.15 < grayColor && grayColor < 0.2){
> > >     color = texture2D(symbol4, symbolCoord);
> > >   }else if(0.2 < grayColor && grayColor < 0.25){
> > >     color = texture2D(symbol5, symbolCoord);
> > >   }else if(0.25 < grayColor && grayColor < 0.3){
> > >     color = texture2D(symbol6, symbolCoord);
> > >   }else if(0.3 < grayColor && grayColor < 0.35){
> > >     color = texture2D(symbol7, symbolCoord);
> > >   }else if(0.35 < grayColor && grayColor < 0.4){
> > >     color = texture2D(symbol8, symbolCoord);
> > >   }else if(0.4 < grayColor && grayColor < 0.45){
> > >     color = texture2D(symbol9, symbolCoord);
> > >     }else if(0.45 < grayColor && grayColor < 0.5){
> > >     color = texture2D(symbol10, symbolCoord);
> > >   }else if(0.5 < grayColor && grayColor < 0.55){
> > >     color = texture2D(symbol11, symbolCoord);
> > >   }else if(0.55 < grayColor && grayColor < 0.6){
> > >     color = texture2D(symbol12, symbolCoord);
> > >   }else if(0.6 < grayColor && grayColor < 0.65){
> > >     color = texture2D(symbol13, symbolCoord);
> > >   }else if(0.65 < grayColor && grayColor < 0.7){
> > >     color = texture2D(symbol14, symbolCoord);
> > >   }else if(0.7 < grayColor && grayColor < 0.75){
> > >     color = texture2D(symbol15, symbolCoord);
> > >   }else if(0.75 < grayColor && grayColor < 0.8){
> > >     color = texture2D(symbol16, symbolCoord);
> > >     }else if(0.8 < grayColor && grayColor < 0.85){
> > >     color = texture2D(symbol17, symbolCoord);
> > >   }else if(0.85 < grayColor && grayColor < 0.9){
> > >     color = texture2D(symbol18, symbolCoord);
> > >   }else if(0.9 < grayColor && grayColor < 0.95){
> > >     color = texture2D(symbol19, symbolCoord);
> > >   }
> > >   else{
> > >     color = texture2D(symbol20, symbolCoord);
> > >   }
> > > 
> > >   gl_FragColor = color;
> > > 
> > > }
> >
> > 
>
> > :Tab title = Alfabeto
> >
> > > :Formula align=center
> >
> > > ![imagen2](/docs/sketches/images/Ascii/simbolo.png)
> > > ![imagen1](/docs/sketches/images/Ascii/2.png)
> > > ![imagen1](/docs/sketches/images/Ascii/3.png)
> > > ![imagen1](/docs/sketches/images/Ascii/4.png)
> > > ![imagen1](/docs/sketches/images/Ascii/5.png)
> > > ![imagen1](/docs/sketches/images/Ascii/6.png)
> > > ![imagen1](/docs/sketches/images/Ascii/7.png)
> > >  ![imagen1](/docs/sketches/images/Ascii/8.png)
> > > ![imagen1](/docs/sketches/images/Ascii/10.png)
> > > ![imagen1](/docs/sketches/images/Ascii/11.png)
> > > ![imagen1](/docs/sketches/images/Ascii/12.png)
> > > ![imagen1](/docs/sketches/images/Ascii/13.png)
> > > ![imagen1](/docs/sketches/images/Ascii/14.png)
> > > ![imagen1](/docs/sketches/images/Ascii/15.png)
> > > ![imagen1](/docs/sketches/images/Ascii/16.png)
> > > ![imagen1](/docs/sketches/images/Ascii/17.png)
> > > ![imagen1](/docs/sketches/images/Ascii/18.png)
> > > ![imagen1](/docs/sketches/images/Ascii/19.png)
> > > ![imagen1](/docs/sketches/images/Ascii/20.png)
> > > ![imagen1](/docs/sketches/images/Ascii/21.png)
> > > ![imagen1](/docs/sketches/images/Ascii/22.png)
> > > ![imagen1](/docs/sketches/images/Ascii/23.png)
> > > ![imagen1](/docs/sketches/images/Ascii/24.png)
> > > ![imagen1](/docs/sketches/images/Ascii/25.png)
> > > ![imagen1](/docs/sketches/images/Ascii/26.png)
> > > ![imagen1](/docs/sketches/images/Ascii/27.png)


> :ToCPrevNext