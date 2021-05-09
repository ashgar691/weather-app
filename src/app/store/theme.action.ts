import { createAction, props } from '@ngrx/store';

export const toggleSwitch = createAction('[Theme] Toggle');
export const setSwitch = createAction('[Theme] Set Switch', props<{ switchState: boolean }>());
export const getSwitch = createAction('[Theme] Get Switch');
