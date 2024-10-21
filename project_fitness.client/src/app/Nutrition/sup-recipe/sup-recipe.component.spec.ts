import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupRecipeComponent } from './sup-recipe.component';

describe('SupRecipeComponent', () => {
  let component: SupRecipeComponent;
  let fixture: ComponentFixture<SupRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
