import { Component, Input } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { WeatherData } from '../../app.component';

@Component({
  selector: 'app-left',
  standalone: true,
  imports: [SearchBarComponent, WeatherInfoComponent],
  templateUrl: './left.component.html',
  styleUrl: './left.component.css',
})
export class LeftComponent {
  @Input() weather?: { current?: object; hourly?: object };
}
