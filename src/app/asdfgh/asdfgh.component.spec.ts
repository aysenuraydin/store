import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsdfghComponent } from './asdfgh.component';

describe('AsdfghComponent', () => {
  let component: AsdfghComponent;
  let fixture: ComponentFixture<AsdfghComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsdfghComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsdfghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
