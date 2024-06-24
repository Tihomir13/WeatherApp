import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWeeklyTabComponent } from './weather-weekly-tab.component';

describe('WeatherWeeklyTabComponent', () => {
  let component: WeatherWeeklyTabComponent;
  let fixture: ComponentFixture<WeatherWeeklyTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWeeklyTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherWeeklyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
