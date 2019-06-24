import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import{DibujosService } from '../../servicios/dibujos.service';
import {AuthService} from '../../servicios/auth.service';
@Component({
  selector: 'app-dibuja',
  templateUrl: './dibuja.component.html',
  styleUrls: ['./dibuja.component.css']
})
export class DibujaComponent implements OnInit {

  constructor( private dibujoServ:DibujosService, private authServ:AuthService) { }

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
  w: 860;
  h: 550;
  color = "";
  ancho = 1;

  cuadricula = false;
  nombreDibujo="";


  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");

    this.ctx = this.canvas.getContext("2d");

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

  cambiarAncho(tam) {
    this.ancho = tam;
  }

  limpiarCanvas() {
    this.ctx.clearRect(0, 0, 860, 550)
  }

  guardarDibujoLocal() {
    let old= this;
    var link = document.createElement('a');
    link.innerHTML = 'download image';
    link.addEventListener('click', function (ev) {
      link.href = old.canvas.toDataURL();
      link.download =  old.nombreDibujo +".png";
    }, false);
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);
    document.getElementById("closeModal").click();
  }

  guardarDibujoOnline(){
    this.dibujoServ.obtenerDibujos();
    let user= this.authServ.usserLogged;
    let url = this.canvas.toDataURL();
    let json ={
      nombre:this.nombreDibujo,
      idAutor:user.key,
      autor:user.data.nombre,
      url:url
    }
    this.dibujoServ.crearDibujo(json);
    document.getElementById("closeModal").click();
    Swal.fire('Exito', 'Imagen ha sido guardada de manera online correctamente', 'success');
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


  mostrarCuadricula() {
    this.cuadricula = !this.cuadricula;
  }


}
