import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAlumnComponent } from './books-alumn.component';

describe('BooksAlumnComponent', () => {
  let component: BooksAlumnComponent;
  let fixture: ComponentFixture<BooksAlumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksAlumnComponent]
    });
    fixture = TestBed.createComponent(BooksAlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
