import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

@Component({
  selector: 'app-left',
  standalone: true,
  imports: [SearchBarComponent, WeatherInfoComponent],
  templateUrl: './left.component.html',
  styleUrl: './left.component.css',
})
export class LeftComponent {
  @Input() weather?: { current?: object; hourly?: object };
  @Input() currentCity: any;
  @Output() sendingToApp = new EventEmitter();

  onGetCity(event: any) {
    this.sendingToApp.emit(event);
  }
}
