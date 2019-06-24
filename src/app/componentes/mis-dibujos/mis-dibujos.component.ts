import { Component, OnInit } from '@angular/core';
import {DibujosService} from '../../servicios/dibujos.service';
import{AuthService} from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";


@Component({
  selector: 'app-mis-dibujos',
  templateUrl: './mis-dibujos.component.html',
  styleUrls: ['./mis-dibujos.component.css']
})
export class MisDibujosComponent implements OnInit {

  listaIntermedia: any = [];
  dibujosLista: any = [];

  constructor(private dibujoServ:DibujosService, private authServ: AuthService,private router: Router) { }

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
            let userID= this.authServ.usserLogged.key;
            if(data.data.idAutor == userID){
              this.dibujosLista.push(data);
            }
          }
          if(this.dibujosLista.length==0){
            Swal.fire('', 'Usted no posee dibujos creados actualmente, cree uno y guardelo para ser visualizado', 'info');
            this.router.navigate(['/dibuja']);
          }
        }
      )  
  }


} 
