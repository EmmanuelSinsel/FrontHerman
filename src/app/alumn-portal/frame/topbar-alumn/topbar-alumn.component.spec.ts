import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarAlumnComponent } from './topbar-alumn.component';

describe('TopbarAlumnComponent', () => {
  let component: TopbarAlumnComponent;
  let fixture: ComponentFixture<TopbarAlumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarAlumnComponent]
    });
    fixture = TestBed.createComponent(TopbarAlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
