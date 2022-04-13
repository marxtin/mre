const canvas = document.getElementById("canvas1");
const context2d = canvas.getContext("2d");
console.log(context2d);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンΣ./-_1234567890:,;ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω";
    this.text = "";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.99) {
      this.y = 0;
    } else {
      this.y++;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 20;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width,height) {
      this.canvasWidth = width;
      this.canvasHeight = height;
      this.columns = this.canvasWidth/this.fontSize;
      this.symbols = [];
      this.#initialize()
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 120;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  
  if (timer > nextFrame) {
    context2d.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context2d.textAlign = 'center';
    context2d.fillRect(0, 0, canvas.width, canvas.height);
    context2d.fillStyle = "#00FF00";
    context2d.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => symbol.draw(context2d));
    timer = 0;
}else{
    timer += deltaTime;
}

  requestAnimationFrame(animate);
}

animate(0);


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})