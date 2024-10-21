import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefitnessclassComponent } from './updatefitnessclass.component';

describe('UpdatefitnessclassComponent', () => {
  let component: UpdatefitnessclassComponent;
  let fixture: ComponentFixture<UpdatefitnessclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatefitnessclassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatefitnessclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
