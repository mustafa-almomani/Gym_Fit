import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdmainComponent } from './recipe-admain.component';

describe('RecipeAdmainComponent', () => {
  let component: RecipeAdmainComponent;
  let fixture: ComponentFixture<RecipeAdmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeAdmainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeAdmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
