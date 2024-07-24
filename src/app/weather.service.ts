import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost/Weatheria/api';

  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string): Observable<any> {
    const params = new HttpParams().set('location', location);
    return this.http.get<any>(`${this.apiUrl}/current`, { params });
  }

  getForecast(location: string): Observable<any> {
    const params = new HttpParams().set('location', location);
    return this.http.get<any>(`${this.apiUrl}/forecast`, { params });
  }

  getAirPollution(location: string): Observable<any> {
    const params = new HttpParams().set('location', location);
    return this.http.get<any>(`${this.apiUrl}/air-pollution`, { params });
  }

  getGeoCoding(location: string): Observable<any> {
    const params = new HttpParams().set('location', location);
    return this.http.get<any>(`${this.apiUrl}/geocoding`, { params });
  }

  getGeoCodingReverse(lat: number, lon: number): Observable<any> {
    const params = new HttpParams().set('lat', lat.toString()).set('lon', lon.toString());
    return this.http.get<any>(`${this.apiUrl}/reverse-geocoding`, { params });
  }

}
