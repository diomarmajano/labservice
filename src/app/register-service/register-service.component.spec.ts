import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterServiceComponent } from './register-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterServiceComponent', () => {
  let component: RegisterServiceComponent;
  let fixture: ComponentFixture<RegisterServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterServiceComponent],
      imports: [ReactiveFormsModule],
      // Usamos NO_ERRORS_SCHEMA para ignorar Componentes que no se reconocen
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(window, 'alert');
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  //Aca vamos a probar la navegacion del paso a paso

  it('debería avanzar al siguiente paso', () => {
    expect(component.pasoActual).toBe(1);
    component.siguientePaso();
    expect(component.pasoActual).toBe(2);
    component.siguientePaso();
    expect(component.pasoActual).toBe(3);
  });

  it('no debería avanzar más allá del paso 3', () => {
    component.pasoActual = 3;
    component.siguientePaso();
    expect(component.pasoActual).toBe(3);
  });

  it('debería retroceder al paso anterior', () => {
    component.pasoActual = 3;
    component.pasoAnterior();
    expect(component.pasoActual).toBe(2);
    component.pasoAnterior();
    expect(component.pasoActual).toBe(1);
  });

  it('no debería retroceder antes del paso 1', () => {
    component.pasoActual = 1;
    component.pasoAnterior();
    expect(component.pasoActual).toBe(1);
  });

  // Validamos campos

  it('debería validar el formato del contacto (9 dígitos)', () => {
    const contacto = component.servicioForm.get('contacto');
    contacto?.setValue('123'); 
    expect(contacto?.hasError('pattern')).toBeTruthy();

    contacto?.setValue('987654321'); 
    expect(contacto?.valid).toBeTruthy();
  });


  it('debería registrar el servicio exitosamente si el formulario es válido', () => {
    // Llenamos todos los campos requeridos
    component.servicioForm.setValue({
      nombre: 'Cliente Test',
      rut: '12.345.678-9',
      contacto: '987654321',
      tipoServicio: 'examen-sangre',
      tipoDispositivo: 'centrifuga',
      fechaIngreso: '2025-12-21',
      valor: 15000,
      detalles: 'Urgente'
    });

    const spyReset = spyOn(component.servicioForm, 'reset');
    
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Servicio registrado exitosamente');
    expect(spyReset).toHaveBeenCalled();
    expect(component.pasoActual).toBe(1); 
  });

  it('debería mostrar alerta de error si el formulario es inválido al enviar', () => {
    // Formulario vacío
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Por favor completa todos los campos requeridos');
  });
});