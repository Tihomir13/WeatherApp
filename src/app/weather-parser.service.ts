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
      description: this.parseCodeToDesc(String(iconCode)),
      img: this.parseCodeToImg(String(iconCode)),
    };
  }

  parseDailyWeather({ daily }: any) {
    const weather = daily.time.map((time: any, index: number) => {
      return {
        timestamp: time * 1000,
        precipitationProb:
          Math.round(daily.precipitation_probability_max[index] * 100) / 100,
        maxWind: daily.wind_speed_10m_max[index],
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        iconCode: daily.weather_code[index],
        day: this.parseIntToDay(String(new Date(time * 1000).getDay())),
        img: this.parseCodeToImg(String(daily.weather_code[index])),
      };
    });
    weather[0].day = 'Today';
    return weather;
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
          img: this.parseCodeToImg(String(hourly.weather_code[index])),
        };
      })
      .filter(({ timestamp }: any) => timestamp >= current.time * 1000);
  }

  parseIntToDay(dayInNum: any): string {
    const dayInWord = (() => {
      switch (dayInNum) {
        case '1':
          return 'Monday';
        case '2':
          return 'Tuesday';
        case '3':
          return 'Wednesday';
        case '4':
          return 'Thursday';
        case '5':
          return 'Friday';
        case '6':
          return 'Saturday';
        case '0':
          return 'Sunday';
        default:
          return 'Invalid day';
      }
    })();
    return dayInWord;
  }

  parseCodeToDesc(code: string) {
    const codeDescriptions: { [key: string]: string } = {
      '0': 'Clear sky',
      '1': 'Mainly clear',
      '2': 'Partly cloudy',
      '3': 'Cloudy',
      '45': 'Fog',
      '48': 'Rime fog',
      '51': 'Drizzle: Light intensity',
      '53': 'Drizzle: Moderate intensity',
      '55': 'Drizzle: Dense intensity',
      '56': 'Freezing Drizzle: Light intensity',
      '57': 'Freezing Drizzle: Dense intensity',
      '61': 'Rain: Slight intensity',
      '63': 'Rain: Moderate intensity',
      '65': 'Rain: Heavy intensity',
      '66': 'Freezing Rain: Light intensity',
      '67': 'Freezing Rain: Heavy intensity',
      '71': 'Snow fall: Slight intensity',
      '73': 'Snow fall: Moderate intensity',
      '75': 'Snow fall: Heavy intensity',
      '77': 'Snow grains',
      '80': 'Rain showers: Slight intensity',
      '81': 'Rain showers: Moderate intensity',
      '82': 'Rain showers: Violent intensity',
      '85': 'Snow showers: Slight intensity',
      '86': 'Snow showers: Heavy intensity',
      '95': 'Thunderstorm: Slight intensity',
      '96': 'Thunderstorm: Moderate intensity',
      '99': 'Thunderstorm: Heavy intensity',
    };

    return codeDescriptions[code] || 'Invalid code';
  }

  parseCodeToImg(code: string) {
    const codeDescriptions: { [key: string]: string } = {
      '0': './images/day/0, 1.png',
      '1': './images/day/0, 1.png',
      '2': './images/day/2.png',
      '3': './images/day/3.png',
      '45': './images/day/45, 48.png',
      '48': './images/day/45, 48.png',
      '51': './images/day/51, 56.png',
      '53': './images/day/53, 55, 57.png',
      '55': './images/day/53, 55, 57.png',
      '56': './images/day/51, 56.png',
      '57': './images/day/53, 55, 57.png',
      '61': './images/day/61, 68.png',
      '63': './images/day/63, 65, 66, 67, 81, 82.png',
      '65': './images/day/63, 65, 66, 67, 81, 82.png',
      '66': './images/day/63, 65, 66, 67, 81, 82.png',
      '67': './images/day/63, 65, 66, 67, 81, 82.png',
      '71': './images/day/71, 85.png',
      '73': './images/day/73, 75, 77, 86.png',
      '75': './images/day/73, 75, 77, 86.png',
      '77': './images/day/73, 75, 77, 86.png',
      '80': './images/day/61, 68.png',
      '81': './images/day/63, 65, 66, 67, 81, 82.png',
      '82': './images/day/63, 65, 66, 67, 81, 82.png',
      '85': './images/day/71, 85.png',
      '86': './images/day/73, 75, 77, 86.png',
      '95': './images/day/95, 96, 99.png',
      '96': './images/day/95, 96, 99.png',
      '99': './images/day/95, 96, 99.png',
    };

    return codeDescriptions[code] || 'Invalid code';
  }
}
