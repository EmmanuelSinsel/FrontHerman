import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansAlumnComponent } from './loans-alumn.component';

describe('LoansAlumnComponent', () => {
  let component: LoansAlumnComponent;
  let fixture: ComponentFixture<LoansAlumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansAlumnComponent]
    });
    fixture = TestBed.createComponent(LoansAlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
