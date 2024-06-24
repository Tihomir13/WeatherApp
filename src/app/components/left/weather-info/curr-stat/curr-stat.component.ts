import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-curr-stat',
  standalone: true,
  imports: [],
  templateUrl: './curr-stat.component.html',
  styleUrl: './curr-stat.component.css',
})
export class CurrStatComponent {
  @Input() img: string = '';
  @Input() statistic: string = '';
}
