import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Favorite } from 'src/app/store/weather.reducer';
import { Weather } from '../../models/weather';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherDetailsService } from '../../services/weather-details.service';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {

  selectedItem!: Weather | any;

  constructor(private weatherDetailsService: WeatherDetailsService,
    private favoritesService: FavoritesService,
    private toastr: ToastrService
  ) { }

  onDestroySubject = new Subject();

  onSelectItem(location: Weather | Favorite) {
    if (!location.Key) { return; }
    forkJoin([this.getWeatherConditions(location.Key), this.getFiveDaysOfForecasts(location.Key)])
      .pipe(takeUntil(this.onDestroySubject)).pipe(takeUntil(this.onDestroySubject)).subscribe(res => {
        this.selectedItem = { ...location, ...res[0][0], ...res[1] };
      }, err => this.toastr.error("Error fetching weather data."));
  }

  getWeatherConditions(key: string): Observable<any> {
    return this.weatherDetailsService.getCurrentConditions(key);
  }

  getFiveDaysOfForecasts(key: string) {
    return this.weatherDetailsService.getFiveDaysOfForecasts(key);
  }

  toggleFavorites(item: Weather) {
    this.inFavorite(item) ? this.favoritesService.removeFavorite(item) : this.favoritesService.add(item);

  }

  inFavorite(selectedItem: Weather): boolean {
    if (!selectedItem) { return false; }
    return this.favoritesService.isInFavorites(selectedItem)
  }

  manageGeoPosition(dLocation: any) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.weatherDetailsService.getGeoLocation(latitude, longitude).pipe(takeUntil(this.onDestroySubject)).subscribe((data: any) => {
        this.onSelectItem(data);
      }, err => {
        this.onSelectItem(dLocation);
      });
    }, (error => {
      // unable to get location
      this.onSelectItem(dLocation);

    }));
  }

  async ngOnInit() {
    const defaultLocation = await this.weatherDetailsService.weatherStore.pipe(first()).toPromise();

    if (!defaultLocation.selectedLocation.Key && navigator.geolocation) {
      this.manageGeoPosition(environment.DEFAULT_WEATHER_LOCATION)
    } else {

      this.onSelectItem(defaultLocation.selectedLocation);
    }
  }
  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }


}
