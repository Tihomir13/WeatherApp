import { Component, Input } from '@angular/core';
import { DayStatComponent } from './day-stat/day-stat.component';

@Component({
  selector: 'app-weather-day',
  standalone: true,
  imports: [DayStatComponent],
  templateUrl: './weather-day.component.html',
  styleUrl: './weather-day.component.css',
})
export class WeatherDayComponent {
  @Input() day?: string;
  @Input() precProb?: string;
  @Input() wind?: string;
  @Input() maxTemp?: string;
  @Input() minTemp?: string;
  @Input() iconCode?: string;
}
