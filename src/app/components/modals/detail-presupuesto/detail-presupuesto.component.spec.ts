import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPresupuestoComponent } from './detail-presupuesto.component';

describe('DetailPresupuestoComponent', () => {
  let component: DetailPresupuestoComponent;
  let fixture: ComponentFixture<DetailPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPresupuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
