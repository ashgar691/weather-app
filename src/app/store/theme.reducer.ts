import { createReducer, on } from '@ngrx/store';
import { toggleSwitch, getSwitch, setSwitch } from './theme.action';

export interface WeatherTheme {
  themeState: boolean
}

export const initialState: WeatherTheme = { themeState: false };

const _themeReducer = createReducer(
  initialState,
  on(toggleSwitch, (state) => {
    const newState = { ...state, ...{ themeState: !state.themeState } as WeatherTheme}
    return newState;
  }),
  on(getSwitch, (state) => state)
);

export function themeReducer(state: any, action: any) {
  return _themeReducer(state, action);
}