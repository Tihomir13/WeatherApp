import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHoursComponent } from './weather-hours.component';

describe('WeatherHoursComponent', () => {
  let component: WeatherHoursComponent;
  let fixture: ComponentFixture<WeatherHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
