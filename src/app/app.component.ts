import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setSwitch } from './store/theme.action';
import { WeatherTheme } from './store/theme.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  switch$: Observable<WeatherTheme>;
  constructor(private store: Store<{ theme: WeatherTheme }>) {
    this.switch$ = store.select("theme");

  }
  title = 'weather-app';
}
