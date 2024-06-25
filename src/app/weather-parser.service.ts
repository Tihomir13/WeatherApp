import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherParserService {
  constructor() {}

  parseCurrentWeather({ current, daily, hourly }: any) {
    const {
      temperature_2m: currentTemp,
      wind_speed_10m: windSpeed,
      apparent_temperature: feelsLike,
      weather_code: iconCode,
    } = current;

    const {
      temperature_2m_max: [maxTemp],
      temperature_2m_min: [minTemp],
    } = daily;

    const {
      relative_humidity_2m: [currentHumidity],
    } = hourly;

    return {
      currentTemp: Math.round(currentTemp),
      highTemp: Math.round(maxTemp),
      lowTemp: Math.round(minTemp),
      feelsLike: Math.round(feelsLike),
      windSpeed: Math.round(windSpeed),
      iconCode,
      currentHumidity,
    };
  }

  parseDailyWeather({ daily }: any) {
    return daily.time.map((time: any, index: number) => {
      return {
        timestamp: time * 1000,
        precipitationProb:
          Math.round(daily.precipitation_probability_max[index] * 100) / 100,
        maxWind: daily.wind_speed_10m_max[index],
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        iconCode: daily.weather_code[index],
      };
    });
  }

  parseHourlyWeather({ hourly, current }: any) {
    return hourly.time
      .map((time: any, index: number) => {
        return {
          temp: Math.round(hourly.temperature_2m[index]),
          iconCode: hourly.weather_code[index],
          timestamp: time * 1000,
          precipitationProb:
            Math.round(hourly.precipitation_probability[index] * 100) / 100,
        };
      })
      .filter(({ timestamp }: any) => timestamp >= current.time * 1000);
  }
}
