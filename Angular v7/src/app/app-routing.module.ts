import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanActivateViaAuthGuard} from './guard';

import {AutenticacionComponent} from '../app/componentes/autenticacion/autenticacion.component';
import {DibujaComponent} from '../app/componentes/dibuja/dibuja.component';
import {DibujosComponent} from '../app/componentes/dibujos/dibujos.component';
import {MiCuentaComponent} from '../app/componentes/mi-cuenta/mi-cuenta.component';
import {MisDibujosComponent} from '../app/componentes/mis-dibujos/mis-dibujos.component';

const routes: Routes = [
  {path:'', component:DibujaComponent},
  {path:'autenticacion', component:AutenticacionComponent},
  {path:'dibuja', component:DibujaComponent},
  {path:'mi-cuenta', component:MiCuentaComponent,canActivate: [CanActivateViaAuthGuard]},
  {path:'dibujos', component:DibujosComponent},
  {path:'mis-dibujos', component:MisDibujosComponent,canActivate: [CanActivateViaAuthGuard]},
  {path:'**', component:DibujaComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
