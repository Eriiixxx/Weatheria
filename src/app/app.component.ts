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

    // this.facultyService.patchData(restOfFacultyInfo, `faculty/${this.editData?.faculty_ID}`).subscribe({
    //   next: (res: any) => {
    //     console.log(res)
    //     this.messageService.sendMessage("Faculty Successfully Edited!", 1)
    //   },
    //   error: (err) => {
    //     console.log(err)
    //     this.messageService.sendMessage("An unexpected Error has occurred!", -1)
    //   },
    //   complete: () => {
    //     this.store.dispatch(loadCollegeProfile());
    //     this.goBack();
    //   }
    // })

    this.weatherService.getCurrentWeather().subscribe({
      next: (data) => {
        this.currentWeather = data;
        console.log('Current Weather:', this.currentWeather);
      },
      error: (error) => {
        console.error('Error fetching current weather:', error);
      }
    });

    this.weatherService.getForecast().subscribe({
      next: (data) => {
        this.forecast = data;
        console.log('Forecast:', this.forecast);
      },
      error: (error) => {
        console.error('Error fetching forecast:', error);
      }
    });

    this.weatherService.getAirPollution().subscribe({
      next: (data) => {
        this.airPollution = data;
        console.log('Air Pollution:', this.airPollution);
      },
      error: (error) => {
        console.error('Error fetching air pollution:', error);
      }
    });

    this.weatherService.getGeoCoding().subscribe({
      next: (data) => {
        this.geoCoding = data;
        console.log('GeoCoding:', this.geoCoding);
      },
      error: (error) => {
        console.error('Error fetching geocoding:', error);
      }
    });

    this.weatherService.getGeoCodingReverse().subscribe({
      next: (data) => {
        this.geoCodingReverse = data;
        console.log('Reverse GeoCoding:', this.geoCodingReverse);
      },
      error: (error) => {
        console.error('Error fetching reverse geocoding:', error);
      }
    });
  }
}
