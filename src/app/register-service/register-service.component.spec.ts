import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterServiceComponent } from './register-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RegisterServiceComponent', () => {
  let component: RegisterServiceComponent;
  let fixture: ComponentFixture<RegisterServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterServiceComponent],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(RegisterServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
