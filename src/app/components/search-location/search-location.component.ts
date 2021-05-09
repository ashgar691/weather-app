import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { WeatherLocation } from 'src/app/store/weather.reducer';
import { WeatherDetailsService } from '../../services/weather-details.service';
import { Weather } from './../../models/weather';

@Component({
  selector: 'search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})

export class SearchLocationComponent {

  selectedLocation = new FormControl();
  filteredOptions$: Observable<Weather[]>;

  @Output() newItemEvent = new EventEmitter<Weather>();

  constructor(private weatherDetailsService: WeatherDetailsService, private store: Store<{ weather: WeatherLocation }>, private route: ActivatedRoute) {
    this.filteredOptions$ = this.selectedLocation.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filter(value))
    );
  }

  private _filter(value: string): Observable<Weather[]> {
    // Check type to prevent unneeded call when selected a value
    if (value === this.weatherDetailsService.selectedWeather?.LocalizedName) { return EMPTY; }
    if (!value || typeof value !== 'string') { return EMPTY; }
    const filterValue = value.toLowerCase();
    return this.weatherDetailsService.getAutoComplete(filterValue);
  }

  onDisplayLocation(value: Weather | any): string {
    return value?.LocalizedName || value;
  }

  onLocationSelected(value: Weather) {
    this.newItemEvent.emit(value);
  }
}

