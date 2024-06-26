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
export class WeatherInfoComponent implements OnInit {
  @Input() weather?: any;
  currentCity?: string;

  constructor(private request: RequestsService) {}
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const data = this.request
          .getCurrCity(latitude.toString(), longitude.toString())
          .subscribe({
            next: (response: any) => {
              this.currentCity = response.geonames[0].name;
            },
            error: (error) => console.log(error),
          });
      },
      (error) => {
        console.log('Грешка при получаване на местоположението:', error);
      }
    );
  }
}
