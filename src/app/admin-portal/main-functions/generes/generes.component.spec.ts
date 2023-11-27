import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneresComponent } from './generes.component';

describe('GeneresComponent', () => {
  let component: GeneresComponent;
  let fixture: ComponentFixture<GeneresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneresComponent]
    });
    fixture = TestBed.createComponent(GeneresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
