import { createAction, props } from '@ngrx/store';

const INCREMENT_ACTION = '[Set Increment Number] Set Increment Number';
const DECREMENT_ACTION = '[Set Decrement Number] Set Decrement Number';
const SET_THEME = '[Set Lading Page] Set Theme';

export const incrementAction = createAction(INCREMENT_ACTION);
export const decrementAction = createAction(DECREMENT_ACTION);

export const setTheme = createAction(
  SET_THEME,
  props<{ theme: 'light' | 'dark' }>()
);
