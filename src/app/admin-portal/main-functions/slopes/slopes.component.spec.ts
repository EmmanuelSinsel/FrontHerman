import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlopesComponent } from './slopes.component';

describe('SlopesComponent', () => {
  let component: SlopesComponent;
  let fixture: ComponentFixture<SlopesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlopesComponent]
    });
    fixture = TestBed.createComponent(SlopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
