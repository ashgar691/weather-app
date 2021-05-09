import { createAction, props } from '@ngrx/store';
import { Weather } from '../models/weather';

export const addToFavorites = createAction('[Weather Component] Add', props<{ location: Weather }>());
export const removeFromFavorites = createAction('[Weather Component] Remove', props<{ location: Weather }>());
export const setLocation = createAction('[Weather Component] Set Location', props<{ selectedLocation: any }>());