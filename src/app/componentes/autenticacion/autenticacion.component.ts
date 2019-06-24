import { Component, OnInit } from '@angular/core';
import { PersonasFirebaseService } from '../../servicios/personas-firebase.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import {AuthService} from '../../servicios/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css']
})
export class AutenticacionComponent implements OnInit {

  registroForm: FormGroup;

  constructor(public PerServ: PersonasFirebaseService,private router: Router, private formBuilder: FormBuilder,private authServ:AuthService) { }

  nombre: string = "";
  contrasena: string = "";
  contrasena2: string = "";
  email: string = "";

  listaIntermedia: any = [];
  personaLista: any = [];
  submitted = false;

  ngOnInit() {

    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmaContrasena: ['', Validators.required]
    }
      , {
        validator: MustMatch('contrasena', 'confirmaContrasena')
      }

    );


    this.obtenerPersonasLista();
  }

  get f() { return this.registroForm.controls; }




  registro() {
    this.submitted = true;
    if (this.registroForm.status == "VALID") {
      //Datos del JSON para registrarse
      let data = {
        nombre: this.nombre,
        contrasena: this.contrasena,
        email: this.email
      }
      this.PerServ.crearPersona(data); //Llama servicio para agregar
      Swal.fire('Correcto', 'Usuario agregado correctamente!', 'success')
      this.resetForm();
    }

  }



  login() {
    this.obtenerPersonasLista();
    let login = this.verificarLogin();
    if (login == null) {
      Swal.fire('Error', 'Usuario no existe registrado!', 'error')
    } else {
      Swal.fire('Correcto', 'Inicio de sesión exitoso. Bienvenido ' + login.data.nombre + " !", 'success')
      this.authServ.setUserLoggedIn(login);
      this.router.navigate(['/dibuja']);
    }
  }


  obtenerPersonasLista() {
    this.PerServ.obtenerPersonas().snapshotChanges()
      .subscribe(
        Persona => {
          this.personaLista = []; // Resetea arreglo
          this.listaIntermedia = [];
          this.listaIntermedia.push(Persona);
          for (var i = 0; i < this.listaIntermedia[0].length; i++) {
            let data = {
              key: this.listaIntermedia[0][i].key,
              data: this.listaIntermedia[0][i].payload.toJSON()
            }
            this.personaLista.push(data);
          }
        }
      )
  }

  verificarLogin() {
    console.log(this.personaLista)
    for (let index = 0; index < this.personaLista.length; index++) {
      console.log(this.personaLista[index])
      console.log(this.personaLista[index].data.email+"=="+ this.email  , this.personaLista[index].data.contrasena +"=="+this.contrasena )
      if (this.personaLista[index].data.email == this.email && this.personaLista[index].data.contrasena == this.contrasena) {
        return this.personaLista[index];
      }
    }
    return null;
  }

  resetForm() {
    this.nombre = "";
    this.contrasena = " ";
    this.contrasena2 = "";
    this.email = "";
  }



}
