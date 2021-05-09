import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ngrx module
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { weatherReducer } from "./store/weather.reducer";
import { themeReducer } from './store/theme.reducer';

// components
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { showCurrentImgPipe } from './components/weather-details/img-show.pipe';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchLocationComponent } from './components/search-location/search-location.component';


// services
import { ApiService } from './services/api.service';
import { WeatherDetailsService } from './services/weather-details.service';
import { FavoritesService } from './services/favorites.service';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['theme', { weather: ['favorites'] }], rehydrate: true })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    FavoritesComponent,
    FooterComponent,
    NavComponent,
    SearchLocationComponent,
    showCurrentImgPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ weather: weatherReducer, theme: themeReducer },
      { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService,
    WeatherDetailsService,
    FavoritesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
