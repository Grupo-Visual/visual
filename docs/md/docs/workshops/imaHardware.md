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
> > > :P5 lib1=/docs/sketches/quadrille.min.js, sketch=/docs/sketches/imageAsciiHard.js, width=600, height=651
>
> > :Tab title=AsciiArtHardware.js
> >
> >  
> > >```js
> > >let mosaic;
> > >let image;
> > >let symbol1;
> > >let debug;
> >>function preload() {
> >>image = loadImage('mandril.jpg');
> >    >symbol1 = loadImage('simbolo.png');
> >   > symbol2 = loadImage('2.png');
> >    >symbol3 = loadImage('3.png');
> >    > symbol4 = loadImage('4.png');
> >    >symbol5 = loadImage('5.png');
> >    > symbol6 = loadImage('6.png');
> >    > symbol7 = loadImage('7.png');
> >    > symbol8 = loadImage('8.png');
> >    >symbol9 = loadImage('9.png');
> >    >  symbol10 = loadImage('10.png');
> >    >symbol11 = loadImage('11.png');
> >    >symbol12 = loadImage('12.png');
> >    > symbol13 = loadImage('13.png');
> >    > symbol14 = loadImage('14.png');
> >    > symbol15 = loadImage('15.png');
> >    > symbol16 = loadImage('16.png');
> >    > symbol17 = loadImage('17.png');
> >    > symbol18 = loadImage('18.png');
> >    > symbol19 = loadImage('19.png');
> >    > symbol20 = loadImage('20.png');
> >    > mosaic = loadShader('shader.vert', 'photomosaic.frag');
> >    >}
> >  >//Función para mapear un color de 0-255 entre 0-4 
> >  >function mapColor(color) {
> > >if (color <= 50) {
> > >    return 0;
> >    > } else if (color <= 102) {
> >    >     return 1;
> >    > } else if (color <= 153) {
> >    >     return 2;
> >    > } else if (color <= 204) {
> >    >     return 3;
> >    > } else if (color <= 255) {
> >    >     return 4;
> >    > }
> >    >}
> >    >
> >  >function colorin(simbolos) {
> >  >numero = Math.floor(Math.random() * (3 - 1) + 1);
> > >console.log(numero);
> >    > simbolos.forEach((posible) => {
> >    >     console.log(posible.indice);
> >    >     if (posible.indice == numero) {
> >    >         console.log(posible.simbolo);
> >    >         si = posible.simbolo;
> >    >     }
> >    > });
> >    > return si;
> >    >}
> >    >
> >  >function setup() {
> >  >simbolos = [{ indice: "1", simbolo: symbol1 }, { indice: "2", simbolo: symbol2 }]
> > >createCanvas(600, 600, WEBGL);
> > > textureMode(NORMAL);
> >    > noStroke();
> >    > shader(mosaic);
> >    > mosaic.setUniform('image', image);
> >    > mosaic.setUniform('symbol1', symbol1);
> >    > mosaic.setUniform('symbol2', symbol2);
> >    > mosaic.setUniform('resolution', 45);
> >    > debug = false;
> >    > mosaic.setUniform('debug', debug);
> >    >}
> >    >
> >    >function draw() {
> >  >background(33);
> >  >cover(true);
> > >}
> > >
> >    >function cover(texture = false) {
> >    >beginShape();
> >  >if (texture) {
> >  >     vertex(-width / 2, -height / 2, 0, 0, 0);
> > >     vertex(width / 2, -height / 2, 0, 1, 0);
> > >     vertex(width / 2, height / 2, 0, 1, 1);
> >    >     vertex(-width / 2, height / 2, 0, 0, 1);
> >    > } else {
> >    >     vertex(-width / 2, -height / 2, 0);
> >    >     vertex(width / 2, -height / 2, 0);
> >    >     vertex(width / 2, height / 2, 0);
> >    >     vertex(-width / 2, height / 2, 0);
> >    > }
> >    > endShape(CLOSE);
> >    >}
> >    >function keyPressed() {
> >    >if (key === 'd') {
> >    >     debug = !debug;
> >    >       mosaic.setUniform('debug', debug);
> >  > }
> >  >}
> > 
> >    
> 
> > :Tab title=.frag
> >
> >
> > > ```c
>> > 
> > > precision mediump float;
> > > uniform sampler2D image;
> > > uniform sampler2D symbol1;
> > > uniform sampler2D symbol2;
> >> uniform bool debug;
> >> uniform float resolution;
> > > varying vec4 vVertexColor ;
> >> varying vec2 vTexCoord;
> > > void main(){
> >> vec2 symbolCoord = vTexCoord * resolution;
> >> vec2 imageCoord = floor(symbolCoord);
> > > symbolCoord = symbolCoord - imageCoord;
> >> imageCoord =  imageCoord * vec2(1.0)/ vec2(resolution);
> > > vec4 index = texture2D(image, imageCoord);
> >> gl_FragColor = debug ? index : texture2D(symbol1, symbolCoord) * vVertexColor;
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