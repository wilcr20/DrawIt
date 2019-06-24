import { Component, OnInit } from '@angular/core';
import {DibujosService} from '../../servicios/dibujos.service';


@Component({
  selector: 'app-dibujos',
  templateUrl: './dibujos.component.html',
  styleUrls: ['./dibujos.component.css']
})
export class DibujosComponent implements OnInit {

  listaIntermedia: any = [];
  dibujosLista: any = [];


  constructor(private dibujoServ:DibujosService) { }

  ngOnInit() {
    this.obtenerDibujosLista();
  }

  obtenerDibujosLista(){
    this.dibujoServ.obtenerDibujos().snapshotChanges()
      .subscribe(
        Dibujo => {
          this.dibujosLista = []; // Resetea arreglo
          this.listaIntermedia = [];
          this.listaIntermedia.push(Dibujo);
          for (var i = 0; i < this.listaIntermedia[0].length; i++) {
            let data = {
              key: this.listaIntermedia[0][i].key,
              data: this.listaIntermedia[0][i].payload.toJSON()
            }
            this.dibujosLista.push(data);
          }

        }
      )  
  }

}
 