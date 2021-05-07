// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Ball{
    constructor(x, y, velX, velY, color, size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        if(this.x >= width || this.x <= 0) this.velX = -this.velX;
        if(this.y >= height || this.y <= 0) this.velY = -this.velY;
    }
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
          if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
      
            if (distance < this.size + balls[j].size) {
              balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
          }
        }
    }

    gravitate(){
        for( let j = 0; j<balls.length; j++){
            if(!(this === balls[j])){
                let accelX = (balls[j].size / (this.x - balls[j].x) )**2 / 100;
                this.velX += accelX;
                let accelY = (balls[j].size / (this.y - balls[j].y) )**2 /100;
                this.velY += accelY;
            }
        }

    }

    collide(){
        let totalMass = calculateMass();
        for( let j = 0; j<balls.length; j++){
            if((balls[j].size)**2 >totalMass*.8) {
                balls.splice(j,1);
                j +=1;
            }
            if(!(this === balls[j])){
                //alert("first gate");
                if( (this.x - balls[j].x)**2 + (this.y - balls[j].y)**2 < (this.size + balls[j].size)**2){
                    //alert("hafhafjdsfh");
                    if (this.size >= balls[j].size){
                        let prevSize = this.size;
                        this.size = ((balls[j].size)**2 + (this.size)**2)**0.5;
                        this.velX = ( this.velX*(prevSize)**2 + balls[j].velX*(balls[j].size)**2 )/(this.size **2);
                        this.velY = ( this.velY*(prevSize)**2 + balls[j].velY*(balls[j].size)**2 )/(this.size **2);
                        /*let sz = random(10,20)/balls[j].size;
                        balls[j] = new Ball(
                            random(sz, width-sz),
                            random(sz, height-sz),
                            random(-7,7),
                            random(-7,7),
                            "rgb(" + random(0,255) + "," +random(0,255) +"," +random(0,255) + ")",
                            sz
                            )*/
                        balls.splice(j,1);
                    
                    }
                }
            }
            
        }
    }
}

class EvilCircle extends Ball {
    update(){
        let _this = this;
        window.onkeydown = function(e) {
            if (e.key === 'a') {
                    _this.x -= _this.velX;
                } else if (e.key === 'd') {
                    _this.x += _this.velX;
                } else if (e.key === 'w') {
                    _this.y -= _this.velY;
                } else if (e.key === 's') {
                    _this.y += _this.velY;
                }
        }
    }
}

let balls = [];
balls.push(new EvilCircle(100,100,20,20,"red",30))
function populate() {
    while(balls.length <25){
        let size = random(10,20);
        balls.push(new Ball(
            random(size, width-size),
            random(size, height-size),
            random(-7,7),
            random(-7,7),
            "rgb(" + random(0,255) + "," +random(0,255) +"," +random(0,255) + ")",
            size
        
            )
        )
    }
}

populate();

function calculateMass(){
    let ret = 0;
    for(j = 0; j<balls.length; j++){
        ret += (balls[j].size)**2;
    }
    return Math.ceil(ret);
}

function getLargest() {
    let ret = 0;
    for(let j= 0;j<balls.length; j++){
        if (balls[j].size > ret) ret = balls[j].size;
    }
    return Math.ceil(ret**2);
}
const header = document.querySelector("h1");
const massCount = document.createElement("p");
const largestMass = document.createElement("p");
//const LineBreak = document.createElement("br");
function loop() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,width, height);

    for (let i = 0; i<balls.length; i++){
        balls[i].draw();
        //balls[i].gravitate();
        balls[i].update();
        balls[i].collide();
    }

    if(balls.length<5) populate();
    requestAnimationFrame(loop);


    header.textContent = "bouncing balls: " + balls.length + " left";
    massCount.textContent = "total mass: " + calculateMass()+ " units";
    largestMass.textContent = "largest ball's mass: " + getLargest() + " units"; 
    //header.appendChild(LineBreak);
    header.appendChild(massCount);
    header.append(largestMass);
    //document.write(massCount);
    header.append(timer);
}

var x = 2;
var timeCount = 0;
const timer = document.createElement("p");
const body = document.querySelector("body");
function runTimer() {
    timeCount += 1;
    
    timer.textContent = timeCount/10 + " seconds have passed";
    
}


setInterval(runTimer, 100);
loop();
//let testBall = new Ball(100, 100, 30, -40, "blue", 20);

//testBall.draw();
//testBall.update();