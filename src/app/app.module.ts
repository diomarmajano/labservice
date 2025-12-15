import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterServiceComponent } from './register-service/register-service.component';
import { NavComponent } from './nav/nav.component';
import { BalanceComponent } from './balance/balance.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PasswordComponent } from './password/password.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    RegisterServiceComponent,
    NavComponent,
    BalanceComponent,
    ServiciosComponent,
    PerfilComponent,
    PasswordComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
