import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAlumnComponent } from './login-alumn.component';

describe('LoginAlumnComponent', () => {
  let component: LoginAlumnComponent;
  let fixture: ComponentFixture<LoginAlumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAlumnComponent]
    });
    fixture = TestBed.createComponent(LoginAlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
