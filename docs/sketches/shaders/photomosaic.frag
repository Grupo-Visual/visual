precision mediump float;

uniform sampler2D image;
uniform sampler2D symbol1, symbol2, symbol3, symbol4, symbol5, symbol6, symbol7, symbol8, symbol9, symbol10, symbol12, symbol11, symbol13, symbol14, symbol15, symbol16, symbol17, symbol18, symbol19, symbol20, symbol21, symbol22, symbol23, symbol24, symbol25, symbol26, symbol27;

uniform float resolution;


varying vec4 vVertexColor ;

varying vec2 vTexCoord;

void main(){

vec2 symbolCoord = vTexCoord * resolution;
vec2 imageCoord = floor(symbolCoord);

symbolCoord = symbolCoord - imageCoord;

imageCoord =  imageCoord * vec2(1.0)/ vec2(resolution);

vec4 color = texture2D(image, imageCoord) * vVertexColor;
float grayColor = (color.r*0.2126 + color.g*0.7152 + color.b*0.0722);



  if(grayColor < 0.05){
    color = texture2D(symbol1, symbolCoord);
  }else if(0.05 < grayColor && grayColor < 0.1){
    color = texture2D(symbol2, symbolCoord);
  }else if(0.1 < grayColor && grayColor < 0.15){
    color = texture2D(symbol3, symbolCoord);
  }else if(0.15 < grayColor && grayColor < 0.2){
    color = texture2D(symbol4, symbolCoord);
  }else if(0.2 < grayColor && grayColor < 0.25){
    color = texture2D(symbol5, symbolCoord);
  }else if(0.25 < grayColor && grayColor < 0.3){
    color = texture2D(symbol6, symbolCoord);
  }else if(0.3 < grayColor && grayColor < 0.35){
    color = texture2D(symbol7, symbolCoord);
  }else if(0.35 < grayColor && grayColor < 0.4){
    color = texture2D(symbol8, symbolCoord);
  }else if(0.4 < grayColor && grayColor < 0.45){
    color = texture2D(symbol9, symbolCoord);
    }else if(0.45 < grayColor && grayColor < 0.5){
    color = texture2D(symbol10, symbolCoord);
  }else if(0.5 < grayColor && grayColor < 0.55){
    color = texture2D(symbol11, symbolCoord);
  }else if(0.55 < grayColor && grayColor < 0.6){
    color = texture2D(symbol12, symbolCoord);
  }else if(0.6 < grayColor && grayColor < 0.65){
    color = texture2D(symbol13, symbolCoord);
  }else if(0.65 < grayColor && grayColor < 0.7){
    color = texture2D(symbol14, symbolCoord);
  }else if(0.7 < grayColor && grayColor < 0.75){
    color = texture2D(symbol15, symbolCoord);
  }else if(0.75 < grayColor && grayColor < 0.8){
    color = texture2D(symbol16, symbolCoord);
    }else if(0.8 < grayColor && grayColor < 0.85){
    color = texture2D(symbol17, symbolCoord);
  }else if(0.85 < grayColor && grayColor < 0.9){
    color = texture2D(symbol18, symbolCoord);
  }else if(0.9 < grayColor && grayColor < 0.95){
    color = texture2D(symbol19, symbolCoord);
  }
  else{
    color = texture2D(symbol20, symbolCoord);
  }

  gl_FragColor = color;

}