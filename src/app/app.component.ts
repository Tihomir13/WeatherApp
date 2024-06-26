import { Component, Input, OnInit } from '@angular/core';
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
  @Input() currentCity: any;
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
              this.initCity();
            },
            error: (error) => console.log(error),
          });
      },
      (error) => {
        console.log('Грешка при получаване на местоположението:', error);
      }
    );
  }

  onNewCity(information: any) {
    const data = this.request
      .getData(
        information.lat.toString(),
        information.lng.toString(),
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

          this.initCity(information.lat, information.lng);
          console.log(this.WeatherData);
        },
        error: (error) => console.log(error),
      });
  }

  initCity(latitude?: string, longitude?: string) {
    if (latitude && longitude) {
      this.request
        .getCurrCity(latitude.toString(), longitude.toString())
        .subscribe({
          next: (response: any) => {
            this.currentCity = response.geonames[0].name;
          },
          error: (error) => console.log(error),
        });
      return;
    }

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
