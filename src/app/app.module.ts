import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { BalanceComponent } from './balance/balance.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PasswordComponent } from './password/password.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { RegisterServiceComponent } from './register-service/register-service.component';
import { ServicesComponent } from './services/services.component';
import { ServiciosComponent } from './servicios/servicios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InicioComponent,
    BalanceComponent,
    LoginComponent,
    NavComponent,
    PasswordComponent,
    PerfilComponent,
    RegisterComponent,
    RegisterServiceComponent,
    ServicesComponent,
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
