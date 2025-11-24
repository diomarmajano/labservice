import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @description
 * Este componente permite registrar un servicio.
 * El registro se realiza en tres pasos:
 * 1. Ingresar datos del cliente.
 * 2. Ingresar datos del servicio .
 * 3. Ingresar valor y detalles del servicio.
 * Este componente se creo con un formulario guiado por pasos,
 * donde cada paso corresponde a una sección del formulario.
 */
@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css']
})
export class RegisterServiceComponent {
   servicioForm: FormGroup;
  pasoActual = 1;

  constructor(private fb: FormBuilder) {
    this.servicioForm = this.fb.group({
      // Paso 1: Cliente
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      contacto: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],

      // Paso 2: Servicio
      tipoServicio: ['', Validators.required],
      tipoDispositivo: ['', Validators.required],
      fechaIngreso: ['', Validators.required],

      // Paso 3: Valor
      valor: [''],
      detalles: ['']
    });
  }

  siguientePaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }

  pasoAnterior() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  onSubmit() {
    if (this.servicioForm.valid) {
      console.log('Datos del servicio:', this.servicioForm.value);
      alert('Servicio registrado exitosamente');
      this.servicioForm.reset();
      this.pasoActual = 1;
    } else {
      alert('Por favor completa todos los campos requeridos');
    }
  }
}
