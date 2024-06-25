import { Component, Input } from '@angular/core';
import { WeatherDayComponent } from './weather-day/weather-day.component';

@Component({
  selector: 'app-weather-weekly-tab',
  standalone: true,
  imports: [WeatherDayComponent],
  templateUrl: './weather-weekly-tab.component.html',
  styleUrl: './weather-weekly-tab.component.css',
})
export class WeatherWeeklyTabComponent {
  @Input() dailyWeather?: any;
}
