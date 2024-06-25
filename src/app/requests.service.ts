import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private URL =
    'https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timeformat=unixtime';

  constructor(private httpClient: HttpClient) {}

  getData(latitude: string, longitude: string, timezone: string) {
    let params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('timezone', timezone);

    return this.httpClient.get(this.URL, { params });
  }
}
