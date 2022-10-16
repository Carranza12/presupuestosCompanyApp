import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPDFComponent } from './details-pdf.component';

describe('DetailsPDFComponent', () => {
  let component: DetailsPDFComponent;
  let fixture: ComponentFixture<DetailsPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
