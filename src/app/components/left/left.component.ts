import { Component } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

@Component({
  selector: 'app-left',
  standalone: true,
  imports: [SearchBarComponent, WeatherInfoComponent],
  templateUrl: './left.component.html',
  styleUrl: './left.component.css',
})
export class LeftComponent {}
