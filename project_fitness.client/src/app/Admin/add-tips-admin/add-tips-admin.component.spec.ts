import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipsAdminComponent } from './add-tips-admin.component';

describe('AddTipsAdminComponent', () => {
  let component: AddTipsAdminComponent;
  let fixture: ComponentFixture<AddTipsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTipsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTipsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
