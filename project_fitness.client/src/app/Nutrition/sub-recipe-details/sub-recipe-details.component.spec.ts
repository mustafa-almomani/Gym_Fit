import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRecipeDetailsComponent } from './sub-recipe-details.component';

describe('SubRecipeDetailsComponent', () => {
  let component: SubRecipeDetailsComponent;
  let fixture: ComponentFixture<SubRecipeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubRecipeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubRecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
