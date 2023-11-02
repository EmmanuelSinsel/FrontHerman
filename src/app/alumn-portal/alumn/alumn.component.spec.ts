import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnComponent } from './alumn.component';

describe('AlumnComponent', () => {
  let component: AlumnComponent;
  let fixture: ComponentFixture<AlumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnComponent]
    });
    fixture = TestBed.createComponent(AlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
