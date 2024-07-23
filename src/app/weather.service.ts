import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost/Weatheria/api';

  constructor(private http: HttpClient) {}

  getCurrentWeather(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current`);
  }

  getForecast(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forecast`);
  }

  getAirPollution(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/air-pollution`);
  }

  getGeoCoding(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/geocoding`);
  }

  getGeoCodingReverse(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reverse-geocoding`);
  }
}
