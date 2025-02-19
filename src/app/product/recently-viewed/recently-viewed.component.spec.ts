import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewedComponent } from './recently-viewed.component';

describe('RecentlyViewedComponent', () => {
  let component: RecentlyViewedComponent;
  let fixture: ComponentFixture<RecentlyViewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentlyViewedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
