import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQsComponent } from './faqs.component';

describe('FAQsComponent', () => {
  let component: FAQsComponent;
  let fixture: ComponentFixture<FAQsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FAQsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
