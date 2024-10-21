import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgymComponent } from './addgym.component';

describe('AddgymComponent', () => {
  let component: AddgymComponent;
  let fixture: ComponentFixture<AddgymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddgymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddgymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
