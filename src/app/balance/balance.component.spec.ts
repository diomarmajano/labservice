import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceComponent } from './balance.component';
import { JsonService } from '../services/json.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// aca hacemos el mock, es decir simulamos los datos que deberian provenir de una api,
class MockJsonService {
  mockData = {
    _embedded: {
      muestrasList: [
        { codigo: 'E001', nombre_paciente: 'Juan Pérez', resultados: 'Normal', diagnostico: 'Saludable' },
        { codigo: 'E002', nombre_paciente: 'Ana Gómez', resultados: 'Anormal', diagnostico: 'Requiere seguimiento' }
      ]
    }
  };

  getJsonData() {
    return of(this.mockData);
  }
}

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;
  let jsonService: JsonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BalanceComponent],
      providers: [
        { provide: JsonService, useClass: MockJsonService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(BalanceComponent, {
      set: {
        providers: [
          { provide: JsonService, useClass: MockJsonService }
        ]
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    jsonService = fixture.debugElement.injector.get(JsonService); 
    
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los balances correctamente desde el servicio', () => {
    expect(component.balances.length).toBe(2);
    expect(component.balances[0].nombre_paciente).toBe('Juan Pérez');
  });
  
});