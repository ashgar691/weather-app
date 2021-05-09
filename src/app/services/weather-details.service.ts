import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherLocation } from '../store/weather.reducer';
import { Weather } from './../models/weather';
import { ApiService } from './api.service';


let API_KEY = "TgTDqFi9I13oAwNBlqsvPy935tyDF9su";

@Injectable()
export class WeatherDetailsService {
  private _selectedWeather!: Weather;
  weatherStore = this.store.select('weather');

  onDestroySubject = new Subject();
  constructor(private store: Store<{ weather: WeatherLocation }>,
    private api: ApiService
  ) {

  }
  getAutoComplete(value: string): Observable<Weather[]> {
    const params = new HttpParams()
      .set("apikey", API_KEY)
      .set("q", value);
    const url = `${environment.api_url}/locations/v1/cities/autocomplete`;
    return this.api.get(url, { params });
  }

  getCurrentConditions(value: string): Observable<any> {
    const params = new HttpParams()
      .set("apikey", API_KEY);
    const url = `${environment.api_url}/currentconditions/v1/${value}`;
    return this.api.get(url, { params });
  }

  getFiveDaysOfForecasts(value: string): Observable<any> {
    const params = new HttpParams().set
      ("apikey", API_KEY)
      .set("metric", "true");
    const url = `${environment.api_url}/forecasts/v1/daily/5day/${value}`;
    return this.api.get(url, { params });
  }
  
  getGeoLocation(lat: number, lng: number): Observable<any> {
    const url = `${environment.api_url}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lng}`;
    return this.api.get(url);
  }
  public get selectedWeather(): Weather {
    return this._selectedWeather;
  }

}
