# Imágenes con shaders

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