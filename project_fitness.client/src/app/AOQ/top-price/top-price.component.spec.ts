import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPriceComponent } from './top-price.component';

describe('TopPriceComponent', () => {
  let component: TopPriceComponent;
  let fixture: ComponentFixture<TopPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
