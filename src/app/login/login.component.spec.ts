import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    routerSpy.navigate.calls.reset();
    
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con campos vacíos', () => {
    expect(component.formularioLogin.get('usuario')?.value).toBe('');
    expect(component.formularioLogin.get('contraseña')?.value).toBe('');
  });

  it('el formulario debe ser inválido si los campos están vacíos', () => {
    expect(component.formularioLogin.valid).toBeFalse();
  });

  it('debe validar que el usuario sea un email correcto', () => {
    const emailControl = component.formularioLogin.get('usuario');
    emailControl?.setValue('correo-no-valido');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.hasError('email')).toBeTrue();

    emailControl?.setValue('test@dominio.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('debe iniciar sesión exitosamente y navegar si los datos coinciden', () => {
    const datosMock = { email: 'test@dominio.com', contraseña: '123' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(datosMock));
    spyOn(localStorage, 'setItem');

    component.formularioLogin.patchValue({
      usuario: 'test@dominio.com',
      contraseña: '123'
    });

    component.submitForm();

    expect(localStorage.setItem).toHaveBeenCalledWith('usuarioLogueado', JSON.stringify(datosMock));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/registrar-servicio']);
  });

  it('debe mostrar alerta si las credenciales son incorrectas', () => {
    const datosMock = { email: 'admin@test.com', contraseña: '456' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(datosMock));
    spyOn(window, 'alert');

    // Datos que NO coinciden con el mock
    component.formularioLogin.patchValue({
      usuario: 'admin@test.com',
      contraseña: 'password-equivocada'
    });

    component.submitForm();

    expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas');
    
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('no debe navegar si el formulario es inválido', () => {
    component.formularioLogin.patchValue({ usuario: '', contraseña: '' });
    
    component.submitForm();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});