import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-hours',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './weather-hours.component.html',
  styleUrls: ['./weather-hours.component.css'],
})
export class WeatherHoursComponent implements AfterViewInit {
  @Input() weatherHourly?: any;

  @ViewChild('weatherHourlyContainer') weatherHourlyContainer!: ElementRef;

  ngAfterViewInit() {
    this.addMouseDragFunctionality();
  }

  addMouseDragFunctionality() {
    const weatherHourly = this.weatherHourlyContainer.nativeElement;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    weatherHourly.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      weatherHourly.classList.add('active');
      startX = e.pageX - weatherHourly.offsetLeft;
      scrollLeft = weatherHourly.scrollLeft;
    });

    weatherHourly.addEventListener('mouseleave', () => {
      isDown = false;
      weatherHourly.classList.remove('active');
    });

    weatherHourly.addEventListener('mouseup', () => {
      isDown = false;
      weatherHourly.classList.remove('active');
    });

    weatherHourly.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - weatherHourly.offsetLeft;
      const walk = (x - startX) * 1.5; // Adjust the multiplier as needed
      weatherHourly.scrollLeft = scrollLeft - walk;
    });

    // Enable wheel scroll functionality
    weatherHourly.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      weatherHourly.scrollLeft += e.deltaY;
    });
  }

  trackByTimestamp(index: number, weatherHour: any): number {
    return weatherHour.timestamp;
  }
}
