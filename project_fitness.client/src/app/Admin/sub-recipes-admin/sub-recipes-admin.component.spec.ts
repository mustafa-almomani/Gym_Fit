import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRecipesAdminComponent } from './sub-recipes-admin.component';

describe('SubRecipesAdminComponent', () => {
  let component: SubRecipesAdminComponent;
  let fixture: ComponentFixture<SubRecipesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubRecipesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubRecipesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
