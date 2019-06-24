import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class PersonasFirebaseService {

  constructor(private firebase: AngularFireDatabase) { }


  listUsers: AngularFireList<any>;

  obtenerPersonas() { // Obtiene todods los Usuarios dela DB
    return this.listUsers = this.firebase.list('Personas');
    // return this.listUsers.snapshotChanges(); // Observable
  }


  crearPersona(user) {  // Realiza la inserción de un Usuario en la DB
    this.listUsers.push(user);
  }

  actualizarPersona(user, key) {
    this.firebase.database.ref('Personas/' + key).set(user);
  }

} 