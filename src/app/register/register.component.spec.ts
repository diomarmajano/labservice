import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debe ser inválido cuando está vacío', () => {
    expect(component.formularioRegister.valid).toBeFalse();
  });

  it('el formulario debe ser válido con datos correctos', () => {
    component.formularioRegister.setValue({
      nombre: 'Juan Perez',
      rol: 'user',
      email: 'juan@test.cl',
      contraseña: 'Password1!'
    });

    expect(component.formularioRegister.valid).toBeTrue();
  });

  it('campoNoValido debe retornar true si el campo es inválido y touched', () => {
    const control = component.formularioRegister.get('nombre');
    control?.markAsTouched();

    expect(component.campoNoValido('nombre')).toBeTrue();
  });

  it('campoNoValido debe retornar false si el campo es válido', () => {
    component.formularioRegister.get('nombre')?.setValue('Juan');
    component.formularioRegister.get('nombre')?.markAsTouched();

    expect(component.campoNoValido('nombre')).toBeFalse();
  });

  it('debe llamar submitForm cuando se envía el formulario', () => {
    spyOn(component, 'submitForm');

    component.formularioRegister.setValue({
      nombre: 'Juan Perez',
      rol: 'admin',
      email: 'juan@test.cl',
      contraseña: 'Password1!'
    });

    const form = fixture.nativeElement.querySelector('#registerForm');
    form.dispatchEvent(new Event('submit'));

    expect(component.submitForm).toHaveBeenCalled();
  });

  it('debe existir el botón registrar', () => {
    const button = fixture.nativeElement.querySelector('#registerButton');
    expect(button).toBeTruthy();
  });
});
