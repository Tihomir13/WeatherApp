import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day-stat',
  standalone: true,
  imports: [],
  templateUrl: './day-stat.component.html',
  styleUrl: './day-stat.component.css'
})
export class DayStatComponent {
  @Input() img: string = '';
  @Input() statistic?: string = '';
}
