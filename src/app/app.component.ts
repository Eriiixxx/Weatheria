import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  currentWeather: any;
  forecast: any;
  airPollution: any;
  geoCoding: any;
  geoCodingReverse: any;
  searchLocation: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.fetchWeatherData('Manila');
  }

  fetchWeatherData(location: string): void {
    this.weatherService.getCurrentWeather(location).subscribe({
      next: (data) => {
        this.currentWeather = data;
        console.log('Current Weather:', this.currentWeather);
      },
      error: (error) => {
        console.error('Error fetching current weather:', error);
      }
    });

    this.weatherService.getForecast(location).subscribe({
      next: (data) => {
        this.forecast = data;
        console.log('Forecast:', this.forecast);
      },
      error: (error) => {
        console.error('Error fetching forecast:', error);
      }
    });

    this.weatherService.getAirPollution(location).subscribe({
      next: (data) => {
        this.airPollution = data;
        console.log('Air Pollution:', this.airPollution);
      },
      error: (error) => {
        console.error('Error fetching air pollution:', error);
      }
    });

    this.weatherService.getGeoCoding(location).subscribe({
      next: (data) => {
        this.geoCoding = data;
        console.log('GeoCoding:', this.geoCoding);
      },
      error: (error) => {
        console.error('Error fetching geocoding:', error);
      }
    });

    this.weatherService.getGeoCodingReverse(14.5995, 120.9842).subscribe({
      next: (data) => {
        this.geoCodingReverse = data;
        console.log('Reverse GeoCoding:', this.geoCodingReverse);
      },
      error: (error) => {
        console.error('Error fetching reverse geocoding:', error);
      }
    });
  }

  onSearch(): void {
    console.log(this.searchLocation);
    if (this.searchLocation) {
      this.fetchWeatherData(this.searchLocation);
    }
  }
}
