import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGymsComponent } from './all-gyms.component';

describe('AllGymsComponent', () => {
  let component: AllGymsComponent;
  let fixture: ComponentFixture<AllGymsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllGymsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
