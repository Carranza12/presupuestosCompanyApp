import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestosCotizadosComponent } from './presupuestos-cotizados.component';

describe('PresupuestosCotizadosComponent', () => {
  let component: PresupuestosCotizadosComponent;
  let fixture: ComponentFixture<PresupuestosCotizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestosCotizadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresupuestosCotizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
