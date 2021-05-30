precision mediump float;

uniform sampler2D img;
uniform vec2 offSet;
uniform float kernel[9];

varying vec4 vVertexColor;
varying vec2 vTexCoord;

void main() {
  
  vec2 tc[9];
  
  vec4 convolution = vec4(0.0,0.0,0.0,1.0);

  tc[0] = vec2(-offSet.s, +offSet.t);
  tc[1] = vec2(0.0,       +offSet.t);
  tc[2] = vec2(+offSet.s, +offSet.t);
  tc[3] = vec2(-offSet.s,       0.0);
  tc[4] = vec2(0.0, 0.0);
  tc[5] = vec2(+offSet.s,       0.0);
  tc[6] = vec2(-offSet.s, -offSet.t);
  tc[7] = vec2(0.0,       -offSet.t);
  tc[8] = vec2(+offSet.t, -offSet.t);
  
  for(int i = 0; i < 9; i++){
    convolution += texture2D(img, vTexCoord + tc[i]) * kernel[i];
  }
  
  gl_FragColor = convolution * vVertexColor;  
  
}