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
        maxWind: Math.round(daily.wind_speed_10m_max[index]),
        maxTemp: Math.round(daily.temperature_2m_max[index]),
        minTemp: Math.round(daily.temperature_2m_min[index]),
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
      '61': './images/day/61, 80.png',
      '63': './images/day/63, 65, 66, 67, 81, 82.png',
      '65': './images/day/63, 65, 66, 67, 81, 82.png',
      '66': './images/day/63, 65, 66, 67, 81, 82.png',
      '67': './images/day/63, 65, 66, 67, 81, 82.png',
      '71': './images/day/71, 85.png',
      '73': './images/day/73, 75, 77, 86.png',
      '75': './images/day/73, 75, 77, 86.png',
      '77': './images/day/73, 75, 77, 86.png',
      '80': './images/day/61, 80.png',
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

   capitals = [
    { city: "Sofia", country: "Bulgaria", lat: 42.6977, lng: 23.3219 },
    { city: "Washington, D.C.", country: "USA", lat: 38.89511, lng: -77.03637 },
    { city: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
    { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
    { city: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050 },
    { city: "Tokyo", country: "Japan", lat: 35.6895, lng: 139.6917 },
    { city: "Canberra", country: "Australia", lat: -35.2809, lng: 149.1300 },
    { city: "Ottawa", country: "Canada", lat: 45.4215, lng: -75.6972 },
    { city: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
    { city: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },
    { city: "New Delhi", country: "India", lat: 28.6139, lng: 77.2090 },
    { city: "Brasília", country: "Brazil", lat: -15.8267, lng: -47.9218 },
    { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
    { city: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
    { city: "Pretoria", country: "South Africa", lat: -25.7479, lng: 28.2293 },
    { city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753 },
    { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
    { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
    { city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },
    { city: "Nairobi", country: "Kenya", lat: -1.2864, lng: 36.8172 },
  ];

  getRandomCity(){
    return this.capitals[Math.floor(Math.random()*this.capitals.length-1)]
  }
  
}
