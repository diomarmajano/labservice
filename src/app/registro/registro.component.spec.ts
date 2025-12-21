import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { JsonService } from '../services/json.servicios';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let jsonServiceSpy: jasmine.SpyObj<JsonService>;

  // Simulamos los datos que vendrian del servicio
  const mockUsuarios = {
    _embedded: {
      userList: [
        { id: 1, rut: '1-9', nombre: 'Dr. House', rol: 'Medico', departamento: 'Diagnóstico' },
        { id: 2, rut: '2-7', nombre: 'Enfermera Joy', rol: 'Enfermera', departamento: 'Urgencias' }
      ]
    }
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('JsonService', [
      'getJsonData', 
      'create', 
      'actualizarUsuario', 
      'eliminarUsuario'
    ]);

    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [FormsModule],
      providers: [{ provide: JsonService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    jsonServiceSpy = TestBed.inject(JsonService) as jasmine.SpyObj<JsonService>;

    jsonServiceSpy.getJsonData.and.returnValue(of(mockUsuarios));
    
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente y cargar la lista inicial', () => {
    expect(component).toBeTruthy();
    expect(jsonServiceSpy.getJsonData).toHaveBeenCalled();
    expect(component.servicios.length).toBe(2);
  });

  // Probamos los datos de los select

  it('debería cargar los datos del usuario seleccionado en el formulario', () => {
    component.usuarioSeleccionadoId = 1;
    component.cargarUsuarioSeleccionado();
    expect(component.usuarioForm.nombre).toBe('Dr. House');
  });


  it('debería resetear el formulario al abrir en modo crear', () => {
    component.abrirFormulario('crear');
    expect(component.modoFormulario).toBe('crear');
    expect(component.usuarioForm.id).toBeNull();
    expect(component.usuarioForm.nombre).toBe('');
  });


  it('debería llamar a create() cuando el modo es crear', () => {
    component.modoFormulario = 'crear';
    component.usuarioForm = { nombre: 'Nuevo' };
    jsonServiceSpy.create.and.returnValue(of({}));
    
    component.accionFormulario();
    
    expect(jsonServiceSpy.create).toHaveBeenCalled();
    expect(jsonServiceSpy.getJsonData).toHaveBeenCalledTimes(2); 
  });

  it('debería llamar a actualizarUsuario() cuando el modo es editar', () => {
    component.modoFormulario = 'editar';
    component.usuarioForm = { id: 1, nombre: 'Editado' };
    jsonServiceSpy.actualizarUsuario.and.returnValue(of({}));
    
    component.accionFormulario();
    
    expect(jsonServiceSpy.actualizarUsuario).toHaveBeenCalled();
  });

  it('debería llamar a eliminarUsuario() cuando el modo es eliminar', () => {
    component.modoFormulario = 'eliminar';
    component.usuarioForm = { id: 1 };
    jsonServiceSpy.eliminarUsuario.and.returnValue(of({}));
    
    component.accionFormulario();
    
    expect(jsonServiceSpy.eliminarUsuario).toHaveBeenCalledWith(1);
  });

  it('debería guardar un profesional desde el formulario principal', () => {
  // Creamos los datos que vamos a enviar para guardar
  const datosAEnviar = { 
    rut: '3-3', 
    nombre: 'Test', 
    rol: 'Medico', 
    departamento: 'Laboratorio' 
  };
  
  // Cargamos esos datos en el componente
  component.nuevoUsuario = { ...datosAEnviar };
  
  // Preparamos el mock del servicio
  jsonServiceSpy.create.and.returnValue(of({}));
  
  // Ejecutamos la acción
  component.guardarProfesional();
  
  expect(jsonServiceSpy.create).toHaveBeenCalledWith(datosAEnviar);
  
  // Verificamos que el componente  limpió los campos 
  expect(component.nuevoUsuario.rut).toBe('');
  expect(component.nuevoUsuario.nombre).toBe('');
});
});