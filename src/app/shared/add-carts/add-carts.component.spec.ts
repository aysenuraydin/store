import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartsComponent } from './add-carts.component';

describe('AddCartsComponent', () => {
  let component: AddCartsComponent;
  let fixture: ComponentFixture<AddCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
