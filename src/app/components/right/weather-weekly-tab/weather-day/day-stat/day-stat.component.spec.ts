import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayStatComponent } from './day-stat.component';

describe('DayStatComponent', () => {
  let component: DayStatComponent;
  let fixture: ComponentFixture<DayStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
