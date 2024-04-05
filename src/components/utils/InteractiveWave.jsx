import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { Box } from '@mui/material';

const InteractiveWave = ({width,height,color,percent,radius}) => {
  class Spring {
    constructor(_p5, p, v, a) {
      this._5p = _p5;
      this.p = p;
      this.v = v;
      this.a = a;
      this.k = 0.025;
      this.defaultPos = p.copy();
    }
    addForce(a) {
      this.a.add(a);
    }
    avoid(mouse, mouseVelocity) {
      let force;
      let dist = p5.Vector.dist(this.p, mouse);
      let maxForce = mouseVelocity.mag();
      if (maxForce > 10) {
        maxForce = 10
      };
      let len = 40;
      if (dist < len) {
        //let strength = _p5.map(toMe.mag(),200,0,0,maxForce);
        mouseVelocity.normalize();
        force = this._5p.map(mouseVelocity.mag(), len, 0, 0, maxForce);
        mouseVelocity.mult(force);
        mouseVelocity.x = 0;
        return mouseVelocity;
      }
    }
    update() {
      this.v.add(this.a);
      this.p.add(this.v);
      this.a.mult(0);
    }
  }

  class Wave {
    constructor(_p5) {
      this._p5 = _p5;
      this.springNum = 0;
      this.springs = [];
      this.springs_interval = 0;
      this.leftDeltas = [];
      this.rightDeltas = [];
      this.spread = 0.25;
      this.defaultWaterLevel = 0;
      this.dumping = 0.95;

      //setting basic parameter
      this.defaultWaterLevel = height / percent;
      this.springNum = width / 3;
      this.springs_interval = width / (this.springNum - 1);

      //init springs
      for (let i = 0; i < this.springNum; i++) {
        this.springs.push(new Spring(this._p5, this._p5.createVector(i * this.springs_interval, this.defaultWaterLevel), this._p5.createVector(0, 0), _p5.createVector(0, 0)));
      }
    }

    updateSprings() {
      //spring basic move
      this.springs.forEach((spring, i, springs) => {
        //spring force
        let springForce = this._p5.createVector(0, 0);;
        let diff = spring.p.y - spring.defaultPos.y;
        springForce.y = -(spring.k * diff);
        spring.addForce(springForce);

        //mouse force
        let mouse = this._p5.createVector(this._p5.mouseX, this._p5.mouseY);
        let pmouse = this._p5.createVector(this._p5.pmouseX, this._p5.pmouseY);
        let mouseVelocity = p5.Vector.sub(mouse, pmouse);
        let avoid = spring.avoid(mouse, mouseVelocity);
        spring.addForce(avoid);

        //dump
        spring.v.mult(this.dumping);

        //update
        spring.update();
      })


      //make wave
      let leftDeltas = [this.springNum];
      let rightDeltas = [this.springNum];
      for (let t = 0; t < 8; t++) {
        this.springs.forEach((spring, i, springs) => {
          if (i > 0) {
            leftDeltas[i] = this.spread * (springs[i].p.y - springs[i - 1].p.y);
            springs[i - 1].v.y += leftDeltas[i];
          }
          if (i < this.springNum - 1) {
            rightDeltas[i] = this.spread * (springs[i].p.y - springs[i + 1].p.y);
            springs[i + 1].v.y += rightDeltas[i];
          }
        });
        this.springs.forEach((spring, i, springs) => {
          if (i > 0) {
            springs[i - 1].p.y += leftDeltas[i];
          }
          if (i < this.springNum - 1) {
            springs[i + 1].p.y += rightDeltas[i];
          }
        });
      }

      }

    show() {
      this._p5.noStroke();
      //gradation
      let grad = this._p5.drawingContext.createLinearGradient(0, 0, 0, height);
      // grad.addColorStop(0.0, 'rgb(112, 143, 255)');
      // grad.addColorStop(0.5, 'rgb(46, 89, 244)');
      // grad.addColorStop(1.0, 'rgb(0, 20, 91)');
      grad.addColorStop(0.0, '#D3ECF9');
      grad.addColorStop(0.5, '#2E88C7');
      grad.addColorStop(1.0, '#2158A8');
      this._p5.drawingContext.fillStyle = grad;
      //p.fill(0,191,255);

      //draw wave
      this._p5.beginShape();
      this._p5.vertex(0, height); //first control point
      this._p5.vertex(0, height); //first point
      this.springs.forEach((spring, i) => {
        let x = spring.p.x;
        let y = spring.p.y;
        this._p5.vertex(x, y);
      });
      this._p5.vertex(width, height); //last point
      this._p5.vertex(width, height); //last control point
      this._p5.endShape();

      //draw points
      // this._p5.fill(0);
      // for(let i = 0; i<this.springNum; i++){
      //   let x = this.springs[i].p.x;
      //   let y = this.springs[i].p.y;
      //   this._p5.ellipse(x,y,4,4);
      // }
    }

    splash() {
      let index = this._p5.floor(this._p5.random(1, this.springNum));
      let vy = this._p5.random(50, height);
      if (index > 0 && index < this.springNum) {
        this.springs[index].v.y = vy;
      }
    }
  }

  let scketch = function(_p5) {
    let wave;

    _p5.setup = function() {
      _p5.createCanvas(width, height, _p5.P2D, true);
      _p5.background(color);
      _p5.canvas.style.borderRadius = radius;

      // generate wave
      wave = new Wave(_p5);
      //first splash
      for (let i = 0; i < 3; i++) {
        setTimeout(function() {
          wave.splash();
        }, 250 * i);
      }
    }

    _p5.draw = function() {
      _p5.background(color);
      wave.updateSprings();
      wave.show();
    }

    _p5.mousePressed = function(event) {
      wave.splash();
    };

    // _p5.windowResized = function() {
    //     _p5.resizeCanvas("1000px","100px");
    //     wave = new Wave(_p5);
    // }
  }

  const p5ContainerRef = useRef();
  useEffect(() => {
    // On component creation, instantiate a p5 object with the sketch and container reference 
    const p5Instance = new p5(scketch, p5ContainerRef.current);

    // On component destruction, delete the p5 instance
    return () => {
        p5Instance.remove();
    }
  }, []);

  return (
    <Box sx={{borderRadius:radius}} ref={p5ContainerRef}/>
  )
}

export default InteractiveWave