import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterServiceComponent } from './register-service/register-service.component';
import { BalanceComponent } from './balance/balance.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PasswordComponent } from './password/password.component';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-servicio', component: RegisterServiceComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'servicios', component: ServiciosComponent },
  {path: 'perfil', component: PerfilComponent},
  {path: 'password', component: PasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
