import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDayComponent } from './weather-day.component';
import { DayStatComponent } from './day-stat/day-stat.component';

describe('WeatherDayComponent', () => {
  let component: WeatherDayComponent;
  let fixture: ComponentFixture<WeatherDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayStatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
