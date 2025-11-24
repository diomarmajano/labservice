import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @description
 * Este componente permite a los usuarios actualizar su perfil.
 * Se puede editar el nombre, correo, rol y contraseña.
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);

      this.perfilForm.setValue({
        nombre: usuario.nombre || '',
        correo: usuario.email || '',
        rol: usuario.rol || '',
        contraseña: usuario.contraseña || ''
      });
    }
  }

  guardarCambios(): void {
    if (this.perfilForm.valid) {
      const datosActualizados = this.perfilForm.value;

      localStorage.setItem('usuarioRegistrado', JSON.stringify({
        nombre: datosActualizados.nombre,
        email: datosActualizados.correo,
        rol: datosActualizados.rol,
        contraseña: datosActualizados.contraseña
      }));

      localStorage.setItem('usuarioLogueado', JSON.stringify({
        nombre: datosActualizados.nombre,
        email: datosActualizados.correo,
        rol: datosActualizados.rol,
        contraseña: datosActualizados.contraseña
      }));

      alert('Perfil actualizado correctamente');
    } else {
      alert('Completa todos los campos correctamente');
    }
  }
}