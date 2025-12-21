import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  // Este objeto lo utilizaremos en el mock
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        //Pasamos el Mock en lugar del Router real
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(window, 'alert');
    localStorage.clear();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos e inválidos', () => {
    const form = component.recuperarForm;
    expect(form.valid).toBeFalsy();
    expect(form.controls['email'].value).toBe('');
    expect(form.controls['nuevaContrasena'].value).toBe('');
  });


  it('debería validar que el email sea obligatorio y tenga formato correcto', () => {
    const email = component.recuperarForm.controls['email'];
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
    
    email.setValue('correo-invalido');
    expect(email.hasError('email')).toBeTruthy();
  });

  it('debería validar que la contraseña tenga al menos 8 caracteres', () => {
    const pass = component.recuperarForm.controls['nuevaContrasena'];
    pass.setValue('123');
    expect(pass.hasError('minlength')).toBeTruthy();
  });


  it('debería mostrar alerta si el formulario es inválido al intentar recuperar', () => {
    component.recuperar();
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa el formulario correctamente.');
  });

  it('debería mostrar alerta si no hay usuarios registrados en localStorage', () => {
    component.recuperarForm.setValue({
      email: 'test@test.com',
      nuevaContrasena: '12345678'
    });

    component.recuperar();
    expect(window.alert).toHaveBeenCalledWith('No hay usuarios registrados.');
  });

  it('debería mostrar alerta si el email no coincide con el registrado', () => {
    const usuarioDB = { email: 'original@test.com', contraseña: 'oldpassword' };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioDB));

    component.recuperarForm.setValue({
      email: 'otro@test.com',
      nuevaContrasena: 'newpassword123'
    });

    component.recuperar();
    expect(window.alert).toHaveBeenCalledWith('El email ingresado no coincide con ningún usuario registrado.');
  });

  it('debería actualizar la contraseña y navegar al login cuando los datos son correctos', () => {
    // Reseteamos el spy antes de la prueba
    routerSpy.navigate.calls.reset();
    
    const emailTest = 'usuario@test.com';
    const nuevaPass = 'nueva12345';

    const usuarioDB = { email: emailTest, contraseña: 'passwordVieja' };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioDB));

    component.recuperarForm.setValue({
      email: emailTest,
      nuevaContrasena: nuevaPass
    });
    
    component.recuperar();

    const usuarioActualizado = JSON.parse(localStorage.getItem('usuarioRegistrado')!);
    expect(usuarioActualizado.contraseña).toBe(nuevaPass);
    expect(window.alert).toHaveBeenCalledWith('Contraseña actualizada correctamente. Por favor, inicia sesión con tu nueva contraseña.');
    
    // 3. Verificamos que se llamó al Spy en lugar del router real
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería actualizar también el "usuarioLogueado" si coincide el email', () => {
    const emailTest = 'activo@test.com';
    const nuevaPass = 'passActiva123';

    localStorage.setItem('usuarioRegistrado', JSON.stringify({ email: emailTest, contraseña: 'old' }));
    localStorage.setItem('usuarioLogueado', JSON.stringify({ email: emailTest, contraseña: 'old' }));

    component.recuperarForm.setValue({ email: emailTest, nuevaContrasena: nuevaPass });
    component.recuperar();

    const logueadoActualizado = JSON.parse(localStorage.getItem('usuarioLogueado')!);
    expect(logueadoActualizado.contraseña).toBe(nuevaPass);
  });
});