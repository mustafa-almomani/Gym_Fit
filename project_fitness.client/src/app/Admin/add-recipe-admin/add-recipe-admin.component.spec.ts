import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeAdminComponent } from './add-recipe-admin.component';

describe('AddRecipeAdminComponent', () => {
  let component: AddRecipeAdminComponent;
  let fixture: ComponentFixture<AddRecipeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRecipeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
