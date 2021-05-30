precision mediump float;

uniform sampler2D img;
uniform int opcion;

varying vec4 vVertexColor;

vec4 textureColor;

float pro;
float luma;

varying vec2 vTexCoord;

void main() {
  textureColor = texture2D(img, vTexCoord);
  if(opcion == 2){
    textureColor.r = 1.0-textureColor.r;
    textureColor.g = 1.0-textureColor.g;
    textureColor.b = 1.0-textureColor.b;
    textureColor.a = 1.0;
  }else if (opcion == 1){
    pro = (textureColor.r + textureColor.g + textureColor.b)/3.0;
    textureColor.r = pro;
    textureColor.g = pro;
    textureColor.b = pro;
    textureColor.a = 1.0;
  }else{
    luma = textureColor.r*0.2989 + textureColor.g*0.5870 + textureColor.b*0.1140;
    textureColor.r = luma;
    textureColor.g = luma;
    textureColor.b = luma;
    textureColor.a = 1.0;
  }
  gl_FragColor = textureColor * vVertexColor;  
}