import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubrecipeAdminComponent } from './add-subrecipe-admin.component';

describe('AddSubrecipeAdminComponent', () => {
  let component: AddSubrecipeAdminComponent;
  let fixture: ComponentFixture<AddSubrecipeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubrecipeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubrecipeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
