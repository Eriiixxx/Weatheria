import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  geoCoding: any[] = [];
  geoCodingReverse: any;
  searchLocation: string = '';
  error: string = '';
  isCelsius: boolean = true;
  suggestions: any[] = [];
  searchSubject = new Subject<string>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.requestUserLocation();
    this.loadTemperatureUnit();
  
    this.searchSubject.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search query is same as previous
      switchMap((query) => {
        console.log('Query:', query); // Log the query
        return this.weatherService.getGeoCoding(query);
      }) // switch to new observable on each new search
    ).subscribe({
      next: (data) => {
        console.log('Data received:', data); // Log the received data
        this.suggestions = data;
        console.log('Suggestions:', this.suggestions);
      },
      error: (error) => {
        console.error('Error fetching suggestions:', error);
      }
    });
  }
  

  loadTemperatureUnit(): void {
    const storedUnit = localStorage.getItem('temperatureUnit');
    if (storedUnit) {
      this.isCelsius = storedUnit === 'C';
    }
  }

  saveTemperatureUnit(): void {
    localStorage.setItem('temperatureUnit', this.isCelsius ? 'C' : 'F');
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
          this.error = '';
          console.error('Geolocation error:', error);
          this.fetchWeatherData('manila'); // Default location
        },
        { enableHighAccuracy: true } // Enable high accuracy
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
      console.error(this.error);
      this.fetchWeatherData('manila'); // Default location
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

  onSearchInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    console.log('Input value:', value); // Log the input value
    this.searchSubject.next(value);
  }


  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSuggestionClick(suggestion: any): void {
    this.searchLocation = suggestion.name;
    this.onSearch();
  }

  onCurrentLocationClick(): void {
    this.requestUserLocation();
  }

  toggleTemperatureUnit(): void {
    this.isCelsius = !this.isCelsius;
    this.saveTemperatureUnit();
  }

  convertTemperature(tempCelsius: number): number {
    return this.isCelsius ? tempCelsius : (tempCelsius * 9/5) + 32;
  }

  getAqiDescription(aqi: number): { label: string, longDescription: string } {
    switch (aqi) {
      case 1:
        return {
          label: 'Good',
          longDescription: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
        };
      case 2:
        return {
          label: 'Fair',
          longDescription: 'Air quality is acceptable; however, some pollutants may be present, which could be a concern for a very small number of people who are unusually sensitive to air pollution.'
        };
      case 3:
        return {
          label: 'Moderate',
          longDescription: 'Air quality is acceptable; however, there may be a concern for some people, especially those with respiratory or heart conditions, as well as children and older adults.'
        };
      case 4:
        return {
          label: 'Poor',
          longDescription: 'Air quality is likely to be a health concern for some people, particularly those with pre-existing conditions. The general public may also start to be affected.'
        };
      case 5:
        return {
          label: 'Very Poor',
          longDescription: 'Health alert: everyone may experience more serious health effects. The entire population is likely to be affected.'
        };
      default:
        return {
          label: 'Unknown',
          longDescription: 'AQI data is not available.'
        };
    }
  }
}
