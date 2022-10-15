import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngenieroComponent } from './ingeniero.component';

describe('IngenieroComponent', () => {
  let component: IngenieroComponent;
  let fixture: ComponentFixture<IngenieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngenieroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngenieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
