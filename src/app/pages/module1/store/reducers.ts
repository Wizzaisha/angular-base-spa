import { createReducer, on } from '@ngrx/store';
import { Module1Actions } from './actions.types';

export interface Module1State {
  numberState: number;
  currentTheme: 'light' | 'dark';
}

export const Module1InitialState: Module1State = {
  numberState: 0,
  currentTheme: 'light',
};

export const Module1Reducer = createReducer(
  Module1InitialState,

  on(Module1Actions.incrementAction, (state, action) => {
    return {
      ...state,
      numberState: state.numberState + 1,
    };
  }),
  on(Module1Actions.decrementAction, (state, action) => {
    return {
      ...state,
      numberState: state.numberState - 1,
    };
  }),
  on(Module1Actions.setTheme, (state, action) => {
    return {
      ...state,
      currentTheme: action.theme,
    };
  })
);
