# Aplicación de máscaras de convolución con Shaders
Convoluciones:

> :Tabs
> > :Tab title=Resultado
> > 
> > > :Formula align=center
> >
> > > :P5 sketch=/docs/sketches/videoConvHardware.js, width=700, height=600
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
> > >   sha = loadShader('/visual/docs/sketches/shaders/paraTodos.vert','/visual/docs/sketches/shaders/imaConv.frag');
> > >}
> > >function setup() {
> > >   createCanvas(700, 550, WEBGL);
> > >   idetindad = createButton('Identity');
> > >   idetindad.position(10, 570);
> > >   idetindad.mousePressed(function () { 
> > >       let aux = [0, 0, 0, 0, 1, 0, 0, 0, 0];
> > >       kernel = aux;
> > >   });
> > >   borde = createButton('Edge detection');
> > >   borde.position(80, 570);
> > >   borde.mousePressed(function () {
> > >       let aux = [-1.0,-1.0,-1.0,-1.0,8.0,-1.0,-1.0,-1.0,-1.0];
> > >       kernel = aux;
> > >   });
> > >   agu = createButton('Sharpen');
> > >   agu.position(195, 570);
> > >   agu.mousePressed(function () {
> > >       let aux = [0.0,-1.0,0.0,-1.0,5.0,-1.0,0.0,-1.0,0.0];
> > >       kernel = aux;
> > >   });
> > >   boxBlur = createButton('Box blur');
> > >   boxBlur.position(270, 570);
> > >   boxBlur.mousePressed(function () {
> > >       let aux = [(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9)];
> > >       kernel = aux;
> > >   });
> > >   gaussBlur = createButton('Gaussian blur');
> > >   gaussBlur.position(345, 570);
> > >   gaussBlur.mousePressed(function () {
> > >       let aux = [(1/16),(2/16),(1/16),(2/16),(4/16),(2/16),(1/16),(2/16),(1/16)];
> > >       kernel = aux;
> > >   });
> > >   colores = createButton('Colors');
> > >   colores.position(645, 570);
> > >   colores.mousePressed(function () {
> > >       siColor = !siColor;
> > >   });
> > >   textureMode(NORMAL);
> > >   shader(sha);
> > >   capture = createCapture(VIDEO);
> > >   capture.hide();
> > >   sha.setUniform("offSet", [1.0/img.width, 1.0/img.height]);
> > >   sha.setUniform("img", capture);
> > >   background(0);
> > >   noStroke();
> > >}
> > >function draw() { 
> > >   beginShape();
> > >   siColor ? fill(255,255,0) : fill(255,255,255);
> > >   vertex(-width/2, -height/2, 0, 0);
> > >   siColor ? fill(0,0,255) : fill(255,255,255);
> > >   vertex(width/2, -height/2, 1, 0);
> > >   siColor ? fill(200,0,0) : fill(255,255,255); 
> > >   vertex(width/2, height/2, 1, 1); 
> > >   siColor ? fill(120,60,255) : fill(255,255,255);
> > >   vertex(-width/2, height/2, 0, 1); 
> > >   sha.setUniform("kernel", kernel);
> > >   endShape(CLOSE);
> > >}
> > > ```
>
> > :Tab title=.frag
> >
> >
> > > ```c
> > >precision mediump float;
> > >
> > >uniform sampler2D img;
> > >uniform vec2 offSet;
> > >uniform float kernel[9];
> > >
> > >varying vec4 vVertexColor;
> > >varying vec2 vTexCoord;
> > >void main() {
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
> > >   convolution += texture2D(img, vTexCoord + tc[i]) * kernel[i];
> > > }
> > > gl_FragColor = convolution * vVertexColor;  
> > >}
> > > ```

> :ToCPrevNext