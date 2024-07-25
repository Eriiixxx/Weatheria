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
  error: string = '';
  isCelsius: boolean = true;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.requestUserLocation();
  }

  requestUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeatherDataByCoords(lat, lon);
        },
        (error) => {
          this.error = 'Unable to retrieve your location';
          console.error('Geolocation error:', error);
          // Optional: Provide fallback data or default location
          this.fetchWeatherData('Manila'); // Default location
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
      console.error(this.error);
      // Optional: Provide fallback data or default location
      this.fetchWeatherData('Manila'); // Default location
    }
  }

  fetchWeatherDataByCoords(lat: number, lon: number): void {
    this.weatherService.getGeoCodingReverse(lat, lon).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const location = data[0].name;
          this.fetchWeatherData(location);
        } else {
          this.error = 'Unable to retrieve location information.';
        }
      },
      error: (error) => {
        console.error('Error fetching reverse geocoding:', error);
        this.error = 'Unable to retrieve location information.';
      }
    });
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
  }

  onSearch(): void {
    console.log(this.searchLocation);
    if (this.searchLocation) {
      this.fetchWeatherData(this.searchLocation);
    }
  }

  onCurrentLocationClick(): void {
    this.requestUserLocation();
  }

  toggleTemperatureUnit(): void {
    this.isCelsius = !this.isCelsius;
  }

  convertTemperature(tempCelsius: number): number {
    return this.isCelsius ? tempCelsius : (tempCelsius * 9/5) + 32;
  }

}
