import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFitnessclassComponent } from './all-fitnessclass.component';

describe('AllFitnessclassComponent', () => {
  let component: AllFitnessclassComponent;
  let fixture: ComponentFixture<AllFitnessclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllFitnessclassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFitnessclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
