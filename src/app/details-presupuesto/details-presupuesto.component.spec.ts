import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPresupuestoComponent } from './details-presupuesto.component';

describe('DetailsPresupuestoComponent', () => {
  let component: DetailsPresupuestoComponent;
  let fixture: ComponentFixture<DetailsPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPresupuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
