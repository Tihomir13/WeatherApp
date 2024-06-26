import { Component, Input, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-hours',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './weather-hours.component.html',
  styleUrl: './weather-hours.component.css',
})
export class WeatherHoursComponent {
  @Input() weatherHourly?: any;
}
