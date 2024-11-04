let pg,pg2,pg3,pg4;
let color0;
let theShader1;
let theShader2;
let tex;



function draw() {
  translate(-width/2,-height/2);
  
  // 遅延処理、描画より速く読み込まれることを防ぐ
  if (frameCount>200){
    clear();
    shader(theShader2);
    theShader2.setUniform(`u_tex`, tex);
    theShader2.setUniform(`u_time`, frameCount / 200);
    rect(0,0,width,height);
  }
}

/** pgの初期化関数
 * @function imageInit
 * @param {p5.Graphics} pg - p5.Graphics
 */
const imageInit = (pg) => {
  pg.rectMode(CENTER);
  pg.fill("#000000");
  pg.noStroke();
};


/** num個で分割した格子模様を画面いっぱいに生成する
* @method widthGrid
* @param  {p5.Graphics}        pg            レイヤー
* @param  {Number}        num           画面の分割数
*/
const widthGrid = (pg,num,size) => {
	// openprocessing上で描画がおかしくなるのでそれ対策
  pg.push();
	pg.fill(255);
	pg.rect(0,0,pg.width*2,pg.height*2);
	pg.fill(0);
  pg.pop();
	
  const w = width/num;
  const w2 = w*size;
  for (let i = 0;i<num;i++){
    for (let j = 0;j<num;j++){
      pg.push();
      pg.translate(i*w + w/2, j*w + w/2);
      pg.rect(0, 0, w2, w2);
      pg.pop();
    }
  }
};

/** num個で分割した格子模様を画面いっぱいに生成する
* @method widthGrid
* @param  {p5.Graphics}        pg            レイヤー
* @param  {Number}        num           画面の分割数
*/
const widthStripe = (pg,num,size) => {
  pg.push();
	pg.fill(255);
	pg.rect(0,0,pg.width*2,pg.height*2);
	pg.fill(0);
  pg.pop();
  
	const w = width/num;
  const w2 = w*size;
    for (let j = 0;j<num;j++){
      pg.push();
      pg.translate(0, j*w + w/2);
      pg.rect(0, 0, pg.width*2, w2);
      pg.pop();
  }
};

/** num個で分割した格子模様を画面いっぱいに生成する
* @method widthGrid
* @param  {p5.Graphics}        pg            レイヤー
* @param  {Number}        num           画面の分割数
*/
const widthGridPg1 = (pg,num) => {
  const w = width/num;
  
  for (let i = 0;i<num;i++){
    for (let j = 0;j<num;j++){
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
        if (random(1)<0.5) {
          pg.fill('#ffffff');
        } else {
          pg.fill(220);
        }
      } else {
        if (random(1)<0.5) {
          pg.fill("#000000");
        } else {
          pg.fill("#F3EEEA");
        }
      }
      pg.rect(i*w + w/2, j*w + w/2, w, w);
    }
  }
};

const rects = (pg,w) => {
  pg.rect(0,0,w,w);
};

// =======================================
// shader周り
// =======================================
  
const randColor = (colorCode) => {
    let rc = color(colorCode);
    return [red(rc) / 255.0, green(rc) / 255.0, blue(rc) / 255.0];
};
const shader1 = {
  vs: `
  precision highp float;
  precision highp int;

  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vTexCoord;

  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;

  void main() {
    vec4 positionVec4 = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
    vTexCoord = aTexCoord;
  }
`,
  fs: `
  precision highp float;
  precision highp int;

  varying vec2 vTexCoord;

  uniform sampler2D u_tex;
  uniform sampler2D u_tex2;
  uniform sampler2D u_tex3;
  uniform sampler2D u_tex4;
  uniform float u_time;
  uniform vec3 u_color;

  float PI = 3.14159265358979;

  // iosだと動かない可能性がある
  // :https://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  float random(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }


  void main() {
    vec2 uv = vTexCoord;
    vec4 tex = texture2D(u_tex2, uv);
    vec4 tex3 = texture2D(u_tex3, uv);
    vec4 tex4 = texture2D(u_tex4, uv);
    vec4 tex_lattice = texture2D(u_tex, uv); // 変換対象

    if(tex_lattice == vec4(u_color, 1.0)){
      gl_FragColor = tex;
    }else if(tex_lattice == vec4(1.0, 1.0, 1.0, 1.0)){
      gl_FragColor = tex4;

      // 黒を反転させる
      //vec4(vec3(1.0) - tex.rgb,1.0);
    }else if(tex_lattice == vec4(1.0, 1.0, 1.0, 0.0)){
       gl_FragColor = tex3;
    }else{
       gl_FragColor = tex_lattice;; 
    }

    // white noise用
    float interval = 3.0;
    float strength = smoothstep(interval * 0.5, interval, interval - mod(0.0, interval));
    float whiteNoise = (random(uv + mod(0.0, 10.0)) * 2.0 - 1.0) * (0.15 + strength * 0.15);
    gl_FragColor = gl_FragColor + whiteNoise;
  }
`
};

const fragGlitch =`
  precision highp float;
  precision highp int;

  varying vec2 vTexCoord;
  
  uniform sampler2D u_tex;
  uniform float u_time;

  float PI = 3.14159265358979;

#define RATE 0.0001

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453) * 2.0 - 1.0;
  }

  float offset(float blocks, vec2 uv) {
    float shaderTime = u_time*RATE;
    return rand(vec2(shaderTime, floor(uv.y * blocks)));
  }


  void main() {
    vec2 uv = vTexCoord; 

    gl_FragColor.r = texture2D(u_tex, uv + vec2(offset(64.0, uv) * 0.03, 0.0)).r;
    gl_FragColor.g = texture2D(u_tex, uv + vec2(offset(64.0, uv) * 0.03 * 0.16666666, 0.0)).g;
    gl_FragColor.b = texture2D(u_tex, uv + vec2(offset(42.0, uv) * 0.03, 0.0)).b;
  }
`;

function setup() {
  createCanvas(800, 800,WEBGL);
  background(20);
	
	noStroke();
	  
  pg = createGraphics(width, height);
  imageInit(pg);
  
  pg2 = createGraphics(width, height);
  imageInit(pg2);
  
  pg3 = createGraphics(width, height);
  imageInit(pg3);
  
  pg4 = createGraphics(width, height);
  imageInit(pg4);
  
  color0 = randColor('#F3EEEA');
  theShader1 = createShader(shader1.vs, shader1.fs);
  theShader2 = createShader(shader1.vs, fragGlitch);
  
  const n = 100;
  translate(-width/2,-height/2);
  
  widthGridPg1(pg,10);
  
  widthGrid(pg2,n,0.5);
  widthGrid(pg3,10,0.7);
  widthStripe(pg4,n,0.5);
  
  shader(theShader1);
  theShader1.setUniform(`u_tex`, pg);
  theShader1.setUniform(`u_tex2`, pg2);
  theShader1.setUniform(`u_tex3`, pg3);
  theShader1.setUniform(`u_tex4`, pg4);
  theShader1.setUniform('u_color', color0);
  theShader1.setUniform(`u_time`, frameCount / 200);
  rect(0,0,width,height);
    
  resetShader();
  tex = get(0,0,width,height);
  describe('Glitch animation of a randomly generated grid pattern.');
}