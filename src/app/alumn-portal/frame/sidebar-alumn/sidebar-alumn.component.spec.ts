import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAlumnComponent } from './sidebar-alumn.component';

describe('SidebarAlumnComponent', () => {
  let component: SidebarAlumnComponent;
  let fixture: ComponentFixture<SidebarAlumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarAlumnComponent]
    });
    fixture = TestBed.createComponent(SidebarAlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
