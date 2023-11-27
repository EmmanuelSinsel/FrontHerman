import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnAccountsComponent } from './alumn-accounts.component';

describe('AlumnAccountsComponent', () => {
  let component: AlumnAccountsComponent;
  let fixture: ComponentFixture<AlumnAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnAccountsComponent]
    });
    fixture = TestBed.createComponent(AlumnAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
