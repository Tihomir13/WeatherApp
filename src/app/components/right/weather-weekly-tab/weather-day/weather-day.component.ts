import { Component } from '@angular/core';
import { DayStatComponent } from './day-stat/day-stat.component';

@Component({
  selector: 'app-weather-day',
  standalone: true,
  imports: [DayStatComponent],
  templateUrl: './weather-day.component.html',
  styleUrl: './weather-day.component.css',
})
export class WeatherDayComponent {}
