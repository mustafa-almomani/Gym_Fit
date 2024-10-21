import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubRecipesAdminComponent } from './update-sub-recipes-admin.component';

describe('UpdateSubRecipesAdminComponent', () => {
  let component: UpdateSubRecipesAdminComponent;
  let fixture: ComponentFixture<UpdateSubRecipesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSubRecipesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubRecipesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
