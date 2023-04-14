import { Component } from '@angular/core';
import {AuthService} from '../app/servicios/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DrawIt';

  constructor(private authServ:AuthService,private router: Router ){}

  cerrarSesion(){
    this.authServ.removeUserLoggedIn();
      this.router.navigate(['/dibuja']);
  }
}
