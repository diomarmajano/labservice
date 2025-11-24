import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * @description
 * Este componente permite a los usuarios recuperar su contraseña.
 * Los usuarios pueden ingresar su email y una nueva contraseña.
 * Si el email coincide con los datos almacenados se actualiza la contraseña.
 */
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
   recuperarForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  recuperar() {
    if (this.recuperarForm.valid) {
      const { email, nuevaContrasena } = this.recuperarForm.value;

      const usuarioRegistradoRaw = localStorage.getItem('usuarioRegistrado');

      if (!usuarioRegistradoRaw) {
        alert('No hay usuarios registrados.');
        return;
      }

      const usuarioRegistrado = JSON.parse(usuarioRegistradoRaw);

      // Validar que el email coincida con el registrado
      if (usuarioRegistrado.email === email) {
        usuarioRegistrado.contraseña = nuevaContrasena;

        // Actualizamos el usuario registrado
        localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));

        // También actualizar si está logueado
        const usuarioLogueadoRaw = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueadoRaw) {
          const usuarioLogueado = JSON.parse(usuarioLogueadoRaw);
          if (usuarioLogueado.email === email) {
            usuarioLogueado.contraseña = nuevaContrasena;
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
          }
        }

        alert('Contraseña actualizada correctamente. Por favor, inicia sesión con tu nueva contraseña.');
        this.router.navigate(['/login']);
      } else {
        alert('El email ingresado no coincide con ningún usuario registrado.');
      }
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }
}
