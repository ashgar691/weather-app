import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherTheme } from 'src/app/store/theme.reducer';
import { toggleSwitch } from './../../store/theme.action';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  switch$: Observable<WeatherTheme>;
  constructor(private store: Store<{ theme: WeatherTheme }>) {
    this.switch$ = store.select("theme");

  }
  onDarkThemeClick() {
    this.store.dispatch(toggleSwitch());
  }

}
