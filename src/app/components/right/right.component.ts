import { Component, Input } from '@angular/core';
import { WeatherWeeklyTabComponent } from './weather-weekly-tab/weather-weekly-tab.component';

@Component({
  selector: 'app-right',
  standalone: true,
  imports: [WeatherWeeklyTabComponent],
  templateUrl: './right.component.html',
  styleUrl: './right.component.css',
})
export class RightComponent {
  @Input() dailyWeather?: any;
}
