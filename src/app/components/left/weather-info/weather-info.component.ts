import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CurrStatComponent } from './curr-stat/curr-stat.component';
import { WeatherHoursComponent } from './weather-hours/weather-hours.component';
import { RequestsService } from '../../../requests.service';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [CurrStatComponent, WeatherHoursComponent],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.css',
})
export class WeatherInfoComponent {
  @Input() weather?: any;
  @Input() currentCity?: string;
}
