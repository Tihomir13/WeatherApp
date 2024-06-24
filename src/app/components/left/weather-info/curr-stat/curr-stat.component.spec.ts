import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrStatComponent } from './curr-stat.component';

describe('CurrStatComponent', () => {
  let component: CurrStatComponent;
  let fixture: ComponentFixture<CurrStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
