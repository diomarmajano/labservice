import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * @description
 * Este componente maneja el inicio de sesión del usuario.
 * Permite al usuario ingresar email y contraseña,
 * y verifica las credenciales almacenadas en localStorage.
 * Si las credenciales son correctas, redirige al usuario a la página de registro de servicio.
 * Si las credenciales son incorrectas, muestra un error.
 */
/**
 * @param {FormBuilder} fb - El FormBuilder lo estamos utilizando para crear formularios reactivos.
 * @param {Router} router - El Router se utiliza para navegar a diferentes rutas de la aplicación.
 * @returns {void}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.formularioLogin = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]]
    });
  }
  submitForm() {
    const datosIngresados = this.formularioLogin.value;

    const usuarioRegistrado = localStorage.getItem('usuarioRegistrado');
    if (usuarioRegistrado) {
      const datosRegistrados = JSON.parse(usuarioRegistrado);
      if (datosIngresados.usuario === datosRegistrados.email && datosIngresados.contraseña === datosRegistrados.contraseña) {
        console.log('Inicio de sesión exitoso');
         localStorage.setItem('usuarioLogueado', JSON.stringify(datosRegistrados));
          this.router.navigate(['/registrar-servicio']);
      } else {
        console.log('Credenciales incorrectas');
        alert('Credenciales incorrectas');
      }
    }
  }

}
