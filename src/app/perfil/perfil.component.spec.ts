import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  // Mock de usuario para simular el localStorage
  const mockUsuario = {
    nombre: 'Diomar Majano',
    email: 'diomar@test.com',
    rol: 'Developer',
    contraseña: 'password123'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [ReactiveFormsModule],
      // NO_ERRORS_SCHEMA permite ignorar componentes hijos como <app-nav>
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    // Limpiamos y preparamos el spy antes de cada test
    spyOn(window, 'alert');
    localStorage.clear();
  });

  function createComponent() {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('debería crear el componente', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  // --- PRUEBAS DE ngOnInit (Carga de datos) ---

  it('debería cargar los datos del usuario desde localStorage al iniciar', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(mockUsuario));
    
    createComponent(); // Al crear el componente se ejecuta ngOnInit

    expect(component.perfilForm.value).toEqual({
      nombre: mockUsuario.nombre,
      correo: mockUsuario.email,
      rol: mockUsuario.rol,
      contraseña: mockUsuario.contraseña
    });
  });

  it('debería mantener el formulario vacío si no hay usuario en localStorage', () => {
    createComponent();
    expect(component.perfilForm.get('nombre')?.value).toBe('');
  });

  // --- PRUEBAS DE VALIDACIÓN ---

  it('debería invalidar el formulario si los campos están vacíos', () => {
    createComponent();
    component.perfilForm.setValue({
      nombre: '',
      correo: '',
      rol: '',
      contraseña: ''
    });
    expect(component.perfilForm.valid).toBeFalsy();
  });

  it('debería validar el formato de correo', () => {
    createComponent();
    const correo = component.perfilForm.get('correo');
    correo?.setValue('correo-invalido');
    expect(correo?.hasError('email')).toBeTruthy();
  });

  // --- PRUEBAS DE guardarCambios() ---

  it('debería mostrar alerta de error si el formulario es inválido al guardar', () => {
    createComponent();
    component.guardarCambios();
    expect(window.alert).toHaveBeenCalledWith('Completa todos los campos correctamente');
  });

  it('debería actualizar localStorage y mostrar éxito si el formulario es válido', () => {
    createComponent();
    
    // Llenamos el formulario con datos válidos
    const nuevosDatos = {
      nombre: 'Juan Perez',
      correo: 'juan@test.com',
      rol: 'Admin',
      contraseña: 'nuevapassword123'
    };
    component.perfilForm.setValue(nuevosDatos);

    component.guardarCambios();

    // Verificar que se guardó en localStorage (ambas llaves)
    const registrado = JSON.parse(localStorage.getItem('usuarioRegistrado')!);
    const logueado = JSON.parse(localStorage.getItem('usuarioLogueado')!);

    expect(registrado.nombre).toBe(nuevosDatos.nombre);
    expect(logueado.email).toBe(nuevosDatos.correo);
    expect(window.alert).toHaveBeenCalledWith('Perfil actualizado correctamente');
  });

  it('debería validar el largo mínimo de la contraseña', () => {
    createComponent();
    const pass = component.perfilForm.get('contraseña');
    pass?.setValue('123');
    expect(pass?.hasError('minlength')).toBeTruthy();
  });
});