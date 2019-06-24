import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DibujosService {

  listDibujos: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {
  }

  obtenerDibujos() { // Obtiene todods los Usuarios dela DB
    return this.listDibujos = this.firebase.list('Personas');
    // return this.listUsers.snapshotChanges(); // Observable
  }


  crearDibujo(user) {  // Realiza la inserción de un Usuario en la DB
    this.listDibujos.push(user);
  }

  actualizarDibujo(user, key) {
    this.firebase.database.ref('Dibujos/' + key).set(user);
  }

  eliminarDibujo(id){
    this.listDibujos.remove(id);
  }

}
