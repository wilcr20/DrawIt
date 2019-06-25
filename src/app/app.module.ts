import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Guard
import {CanActivateViaAuthGuard} from './guard';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { firebaseConfig } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DibujaComponent } from './componentes/dibuja/dibuja.component';
import { AutenticacionComponent } from './componentes/autenticacion/autenticacion.component';
import { MiCuentaComponent } from './componentes/mi-cuenta/mi-cuenta.component';
import { MisDibujosComponent } from './componentes/mis-dibujos/mis-dibujos.component';
import { DibujosComponent } from './componentes/dibujos/dibujos.component';

@NgModule({
  declarations: [
    AppComponent,
    DibujaComponent,
    AutenticacionComponent,
    MiCuentaComponent,
    MisDibujosComponent,
    DibujosComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,  // Firebase database module
  ],
  providers: [AngularFirestore,CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
