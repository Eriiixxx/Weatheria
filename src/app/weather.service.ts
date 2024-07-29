import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost/Weatheria/api';

  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current/${location}`);
  }

  getForecast(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forecast/${location}`);
  }

  getAirPollution(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/air-pollution/${location}`);
  }

  getGeoCoding(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/geocoding/${location}`);
  }

  getGeoCodingReverse(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reverse-geocoding/${lat}/${lon}`);
  }

  getLocationSuggestions(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/location-suggestions/${query}`);
  }
}
