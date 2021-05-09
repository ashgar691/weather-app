import { createReducer, on } from '@ngrx/store';
import { addToFavorites, removeFromFavorites, setLocation as setLocation } from './weather.actions';


export interface WeatherLocation {
  selectedLocation: Favorite,
  favorites: Favorite[]

}
export interface Favorite {
  Key: string,
  LocalizedName: string
}

export const initialState: WeatherLocation = { selectedLocation: { Key: '', LocalizedName: '' }, favorites: [] };

const _weatherReducer = createReducer(
  initialState,
  on(addToFavorites, (state, { location }) => ({
    ...state,
    ...{
      favorites: [...state.favorites, { LocalizedName: location.LocalizedName, Key: location.Key }]
    }
  })),
  on(removeFromFavorites, (state, { location }) => {
    if (!location.Key) { return state };

    const locationFiltered = state.favorites.filter(_location => (_location.Key !== location.Key));
    return { ...state, favorites: locationFiltered };
  }),
  on(setLocation, (state, { selectedLocation }) => {
    if (!selectedLocation) { return state };
    return {
      ...state, ...{ selectedLocation: selectedLocation }
    };
  }),

);

export function weatherReducer(state: any, action: any) {
  return _weatherReducer(state, action);
}