import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Weather } from '../models/weather';
import { addToFavorites, removeFromFavorites, setLocation } from '../store/weather.actions';
import { Favorite, WeatherLocation } from './../store/weather.reducer';

@Injectable()
export class FavoritesService {


  public favorites: Favorite[] = [];

  constructor(private store: Store<{ weather: WeatherLocation }>,
    private router: Router) {
    this.store.select('weather').subscribe(weatherObj => this.favorites = weatherObj.favorites);
  }

  add(item: Weather) {
    this.store.dispatch(addToFavorites({ location: item }));
  }

  getFavorites() {
    return this.favorites;
  }

  removeFavorite(item: Weather) {
    this.store.dispatch(removeFromFavorites({ location: item }));
  }

  isInFavorites(selectedItem: Weather) {
    return !!this.favorites.find(({ Key: key }) => key === selectedItem.Key);
  }

  locationClicked(location: Favorite) {

    this.store.dispatch(setLocation({ selectedLocation: location }));

    this.router.navigate(['weather-details']);
  }
}
