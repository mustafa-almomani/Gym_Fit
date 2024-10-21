import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTipsAdminComponent } from './update-tips-admin.component';

describe('UpdateTipsAdminComponent', () => {
  let component: UpdateTipsAdminComponent;
  let fixture: ComponentFixture<UpdateTipsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTipsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTipsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
