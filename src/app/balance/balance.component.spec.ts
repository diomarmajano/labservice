import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceComponent } from './balance.component';
import { JsonService } from '../services/json.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;
  let jsonServiceSpy: jasmine.SpyObj<JsonService>;

  const mockData = {
    _embedded: {
      muestrasList: [
        { codigo: '001', nombre_paciente: 'Juan Perez', resultados: 'Normal', diagnostico: 'Sano' },
        { codigo: '002', nombre_paciente: 'Ana Lopez', resultados: 'Alterado', diagnostico: 'Observación' }
      ]
    }
  };

  beforeEach(async () => {
    // Creamos el Spy una sola vez
    const spy = jasmine.createSpyObj('JsonService', ['getJsonData']);

    await TestBed.configureTestingModule({
      declarations: [BalanceComponent],
      imports: [HttpClientTestingModule], 
      providers: [
        { provide: JsonService, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    // Si el componente provee el servicio internamente (en el decorator @Component), 
    // necesitamos el override. Si no, con la parte de arriba basta.
    .overrideComponent(BalanceComponent, {
      set: {
        providers: [{ provide: JsonService, useValue: spy }]
      }
    })
    .compileComponents();

    jsonServiceSpy = TestBed.inject(JsonService) as jasmine.SpyObj<JsonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    
    // Configuramos el comportamiento por defecto del spy antes de detectar cambios
    jsonServiceSpy.getJsonData.and.returnValue(of(mockData));
    
    fixture.detectChanges(); // Esto dispara el ngOnInit
  });

  // --- AQUÍ ESTÁN LAS PRUEBAS (LOS "CHILDREN") QUE FALTABAN ---

  it('debería crear el componente Balance', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar los datos en la tabla (si existe en el HTML)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Buscamos si el nombre 'Juan Perez' aparece en el DOM
    expect(compiled.innerHTML).toContain('Juan Perez');
  });
});