import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecipeAdminComponent } from './update-recipe-admin.component';

describe('UpdateRecipeAdminComponent', () => {
  let component: UpdateRecipeAdminComponent;
  let fixture: ComponentFixture<UpdateRecipeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRecipeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRecipeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
