import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialAdminComponent } from './testimonial-admin.component';

describe('TestimonialAdminComponent', () => {
  let component: TestimonialAdminComponent;
  let fixture: ComponentFixture<TestimonialAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
