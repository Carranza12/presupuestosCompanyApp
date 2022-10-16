import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestosAprobadosComponent } from './presupuestos-aprobados.component';

describe('PresupuestosAprobadosComponent', () => {
  let component: PresupuestosAprobadosComponent;
  let fixture: ComponentFixture<PresupuestosAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestosAprobadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresupuestosAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
