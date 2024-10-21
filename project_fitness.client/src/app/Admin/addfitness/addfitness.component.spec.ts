import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfitnessComponent } from './addfitness.component';

describe('AddfitnessComponent', () => {
  let component: AddfitnessComponent;
  let fixture: ComponentFixture<AddfitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddfitnessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
