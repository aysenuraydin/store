import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CktextComponent } from './cktext.component';

describe('CktextComponent', () => {
  let component: CktextComponent;
  let fixture: ComponentFixture<CktextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CktextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CktextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
