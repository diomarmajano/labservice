import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [ ReactiveFormsModule ]
      
    });
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debe ser inválido si los campos están vacíos', () => {
    expect(component.recuperarForm.valid).toBeFalse();
  });

  it('el formulario debe ser válido cuando email y contraseña están completos', () => {
    component.recuperarForm.setValue({
      email: 'test@test.cl',
      nuevaContrasena: '123456'
    });

    expect(component.recuperarForm.valid).toBeTrue();
  });

  it('debe llamar al método recuperar cuando se envía el formulario', () => {
    spyOn(component, 'recuperar');

    component.recuperarForm.setValue({
      email: 'test@test.cl',
      nuevaContrasena: '123456'
    });

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.recuperar).toHaveBeenCalled();
  });

  it('debe existir el input email', () => {
    const compiled = fixture.nativeElement;
    const emailInput = compiled.querySelector('#email');

    expect(emailInput).toBeTruthy();
  });
});
