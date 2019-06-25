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
  urlDibujo="";
 
  constructor(private dibujoServ:DibujosService, private authServ: AuthService,private router: Router) { }

  ngOnInit() {
    this.obtenerDibujosLista();
  }


  eliminarDibujo(key){
    console.log(key);
    Swal.fire({
      title: 'Elimianar Dibujo',
      text: "Si eliminas este dibujo, será imposible de volverlo a recuperar. ¿Desea continuar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminarlo!'
    }).then((result) => {
      if (result.value) {
        this.dibujoServ.eliminarDibujo(key);
        this.obtenerDibujosLista();
        Swal.fire(
          'Eliminad0!',
          'Tu dibujo ha sido eliminado corectamente',
          'success'
        )
      }
    })
    
  }

  verDibujo(url){
    this.urlDibujo= url;
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
          document.getElementById("spinner").remove();
          if(this.dibujosLista.length==0){
            Swal.fire('', 'Usted no posee dibujos creados actualmente, cree uno y guardelo para ser visualizado', 'info');
            this.router.navigate(['/dibuja']);
          }
        }
      )  
  }


} 
