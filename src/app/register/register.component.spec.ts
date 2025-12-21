import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 

    spyOn(window, 'alert');
    localStorage.clear();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  //Validamos campos del formulario

  it('debería validar que el nombre sea obligatorio y solo acepte letras', () => {
    const nombre = component.formularioRegister.get('nombre');
    
    nombre?.setValue('');
    expect(nombre?.hasError('required')).toBeTruthy();

    nombre?.setValue('12345'); // Solo letras permitidas
    expect(nombre?.hasError('pattern')).toBeTruthy();

    nombre?.setValue('Juan Perez');
    expect(nombre?.valid).toBeTruthy();
  });

  it('debería validar la contraseña con el patrón de seguridad', () => {
    const pass = component.formularioRegister.get('contraseña');
    
    pass?.setValue('debil');
    expect(pass?.hasError('minlength')).toBeTruthy();

    // Sin mayúscula ni símbolo
    pass?.setValue('password123');
    expect(pass?.hasError('pattern')).toBeTruthy();

    //Valida formato correcto
    pass?.setValue('Admin123!');
    expect(pass?.valid).toBeTruthy();
  });


  it('campoNoValido() debería retornar true solo si el campo es inválido y fue tocado', () => {
    const nombre = component.formularioRegister.get('nombre');
    nombre?.setValue('');
    
    expect(component.campoNoValido('nombre')).toBeFalsy();

    nombre?.markAsTouched();
    expect(component.campoNoValido('nombre')).toBeTruthy();
  });


  it('debería registrar al usuario en localStorage si el formulario es válido', () => {
    const datosValidos = {
      nombre: 'Diomar Majano',
      rol: 'admin',
      email: 'diomar@test.com',
      contraseña: 'Password123!'
    };

    component.formularioRegister.setValue(datosValidos);
    
    const spyReset = spyOn(component.formularioRegister, 'reset');

    component.submitForm();

    const guardado = JSON.parse(localStorage.getItem('usuarioRegistrado')!);
    expect(guardado.email).toBe(datosValidos.email);
    expect(window.alert).toHaveBeenCalledWith('Usuario registrado correctamente');
    expect(spyReset).toHaveBeenCalled();
  });

  it('no debería registrar nada si el formulario es inválido', () => {
    spyOn(console, 'log');
    component.formularioRegister.setValue({
      nombre: '',
      rol: '',
      email: '',
      contraseña: ''
    });

    component.submitForm();

    expect(localStorage.getItem('usuarioRegistrado')).toBeNull();
    expect(console.log).toHaveBeenCalledWith('Formulario inválido');
  });
});