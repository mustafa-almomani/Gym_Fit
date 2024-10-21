import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrotionPageOneComponent } from './nutrotion-page-one.component';

describe('NutrotionPageOneComponent', () => {
  let component: NutrotionPageOneComponent;
  let fixture: ComponentFixture<NutrotionPageOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutrotionPageOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutrotionPageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
