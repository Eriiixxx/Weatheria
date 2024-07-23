import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');

    this.weatherService.getCurrentWeather().subscribe(data => {
      this.currentWeather = data;
      console.log('Current Weather:', this.currentWeather);
    }, error => {
      console.error('Error fetching current weather:', error);
    });

    this.weatherService.getForecast().subscribe(data => {
      this.forecast = data;
      console.log('Forecast:', this.forecast);
    }, error => {
      console.error('Error fetching forecast:', error);
    });

    this.weatherService.getAirPollution().subscribe(data => {
      this.airPollution = data;
      console.log('Air Pollution:', this.airPollution);
    }, error => {
      console.error('Error fetching air pollution:', error);
    });

    this.weatherService.getGeoCoding().subscribe(data => {
      this.geoCoding = data;
      console.log('GeoCoding:', this.geoCoding);
    }, error => {
      console.error('Error fetching geocoding:', error);
    });

    this.weatherService.getGeoCodingReverse().subscribe(data => {
      this.geoCodingReverse = data;
      console.log('Reverse GeoCoding:', this.geoCodingReverse);
    }, error => {
      console.error('Error fetching reverse geocoding:', error);
    });
  }
}
