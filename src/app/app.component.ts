import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import { RequestsService } from './requests.service';
import { WeatherParserService } from './weather-parser.service';

export interface WeatherData {
  current: object;
  daily: object;
  hourly: object;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftComponent, RightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  WeatherData?: WeatherData;

  constructor(
    private request: RequestsService,
    private weather: WeatherParserService
  ) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const data = this.request
          .getData(
            latitude.toString(),
            longitude.toString(),
            Intl.DateTimeFormat().resolvedOptions().timeZone
          )
          .subscribe({
            next: (response) => {
              const data = {
                current: this.weather.parseCurrentWeather(response),
                daily: this.weather.parseDailyWeather(response),
                hourly: this.weather.parseHourlyWeather(response),
              };
              this.WeatherData = data;
              console.log(this.WeatherData);
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
