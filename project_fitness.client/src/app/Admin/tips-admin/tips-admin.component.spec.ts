import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsAdminComponent } from './tips-admin.component';

describe('TipsAdminComponent', () => {
  let component: TipsAdminComponent;
  let fixture: ComponentFixture<TipsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
