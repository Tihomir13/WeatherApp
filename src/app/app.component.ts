import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';

import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftComponent, RightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'WeatherApp';
}
