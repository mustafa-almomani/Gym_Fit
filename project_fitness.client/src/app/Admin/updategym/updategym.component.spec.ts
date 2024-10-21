import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategymComponent } from './updategym.component';

describe('UpdategymComponent', () => {
  let component: UpdategymComponent;
  let fixture: ComponentFixture<UpdategymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdategymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdategymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
