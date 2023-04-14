import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from '../autenticacion/_helpers/must-match.validator';
import Swal from 'sweetalert2';
import {PersonasFirebaseService} from '../../servicios/personas-firebase.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  contrasenaForm: FormGroup;

  constructor( private authServ:AuthService,private personaServ:PersonasFirebaseService,private router:Router, private formBuilder: FormBuilder) { }

  usuario:any;
  contrasena="";
  nuevaContrasena="";
  confirmaContrasena="";
  submitted = false;

  ngOnInit() {

   this.usuario= this.authServ.getUserLoggedIn();
   this.contrasenaForm = this.formBuilder.group({
      contrasena: ['', [Validators.required]],
      newContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmaNewContrasena: ['', Validators.required]
    }
      , {
        validator: MustMatch('newContrasena', 'confirmaNewContrasena')
      }

    );
  }

  get f() { return this.contrasenaForm.controls; }

  cambiarContrasena(){
    this.submitted= true;
    if (this.contrasenaForm.status == "VALID") {
      this.verificarContraseñaActual();
    }
  }

  eliminarCuenta(){
    Swal.fire({
      title: 'Elimianar Cuenta',
      text: "Si eliminas tu cuenta, todos tus datos serán removidos, así como tud dibujos creados en la plataforma.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminarla!'
    }).then((result) => {
      if (result.value) {
        this.personaServ.obtenerPersonas();
        this.personaServ.eliminarPersona(this.authServ.usserLogged.key);
        this.authServ.removeUserLoggedIn();
        this.router.navigate(['/dibuja'])
        
        Swal.fire(
          'Eliminada!',
          'Tu cuenta ha sido eliminada corectamente',
          'success'
        )
      }
    })
  }

  verificarContraseñaActual(){
    let usuario= this.authServ.usserLogged;
    let contraActual= usuario.data.contrasena;
    if (contraActual == this.contrasena){
      usuario.data.contrasena= this.nuevaContrasena; // Cambia contraseña
      this.personaServ.actualizarPersona(usuario.data, usuario.key);
      document.getElementById("closeModal").click();
      Swal.fire('Exito', 'Contraseña cambiada correctamente! Vuelva a iniciar sesión para terminar el cambio.', 'success');
      this.authServ.removeUserLoggedIn();
      this.router.navigate(['/autenticacion'])
      return;

    }else{
      Swal.fire('Error', 'Contraseña ingresada no coincide con la actual!', 'error');
      return;
    }
  }


}
