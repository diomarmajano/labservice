import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @description
 * Este componente permite a los usuarios registrarse en la aplicación.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formularioRegister!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.formularioRegister = this.fb.group({
        nombre: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z\s]+$/)]],
        rol: ['', [Validators.required]],
        email:['',[Validators.required, Validators.email]],
        contraseña: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]]
    });
  }
   campoNoValido(campo: string) {
    const control = this.formularioRegister.get(campo);
    return control && control.invalid && (control.dirty || control.touched);
  }
  submitForm() {
    if (this.formularioRegister.valid) {
      const registerData = this.formularioRegister.value;
      localStorage.setItem('usuarioRegistrado', JSON.stringify(registerData));
      alert('Usuario registrado correctamente');
      console.log('Datos de inicio de sesión:', registerData);
      this.formularioRegister.reset();

    } else {
      console.log('Formulario inválido');
    }
  }
}
