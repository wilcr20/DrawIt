import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dibuja',
  templateUrl: './dibuja.component.html',
  styleUrls: ['./dibuja.component.css']
})
export class DibujaComponent implements OnInit {

  constructor() { }

  anchos = [{
    tam: 1,
    img: 'https://i.imgur.com/HzFq92z.png'
  },
  {
    tam: 3,
    img: 'https://i.imgur.com/tglIIMh.png'
  }
    ,
  {
    tam: 7,
    img: 'https://i.imgur.com/RxSlVQs.png'
  }
   /* ,
  {
    tam: 13,
    img: 'https://i.imgur.com/nC6oDEY.png'
  }
    ,
  {
    tam: 20,
    img: 'https://i.imgur.com/HECj0CE.png'
  }*/

  ]

  flag = false;
  prevX = 0;
  currX = 0;
  prevY = 0;
  currY = 0;
  dot_flag = false;
  canvas: any;
  ctx: any
  w: 800;
  h: 500;
  color = "";
  ancho = 1;
  cuadricula= false;
  

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
  
    this.ctx = this.canvas.getContext("2d");

    console.log(this.w, this.h, this.ctx)
    let oldthis = this;
    this.canvas.addEventListener("mousemove", function (e) {
      oldthis.findxy('move', e)
    }, false);

    this.canvas.addEventListener("mousedown", function (e) {
      oldthis.findxy('down', e)
    }, false);

    this.canvas.addEventListener("mouseup", function (e) {
      oldthis.findxy('up', e)
    }, false);

    this.canvas.addEventListener("mouseout", function (e) {
      oldthis.findxy('out', e)
    }, false);
  }

  dibuja() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
     this.ctx.lineTo(this.currX, this.currY); //rectas
    //this.ctx.arc(this.currX, this.currY,0.1, 0, 2 * Math.PI, true);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.ancho;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  cambiarAncho(tam){
    this.ancho= tam;
  }

  limpiarCanvas(){
    this.ctx.clearRect(0, 0, 800, 500)
  }

  findxy(res, e) {

    if (res == 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.offsetLeft;
      this.currY = e.clientY - this.canvas.offsetTop;

      this.flag = true;
      this.dot_flag = true;
      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.currX, this.currY, 2, 2);
        this.ctx.closePath();
        this.dot_flag = false;
      }
    }
    if (res == 'up' || res == "out") {
      this.flag = false;
    }
    if (res == 'move') {
      if (this.flag) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
        this.dibuja();
      }
    }
  }


  mostrarCuadricula(){
    this.cuadricula= !this.cuadricula;
  }


}
