import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  currentWeather: any;
  forecast: any;
  airPollution: any;
  geoCoding: any;
  geoCodingReverse: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe(data => {
      this.currentWeather = data;
    });

    this.weatherService.getForecast().subscribe(data => {
      this.forecast = data;
    });

    this.weatherService.getAirPollution().subscribe(data => {
      this.airPollution = data;
    });

    this.weatherService.getGeoCoding().subscribe(data => {
      this.geoCoding = data;
    });

    this.weatherService.getGeoCodingReverse().subscribe(data => {
      this.geoCodingReverse = data;
    });
  }
}
