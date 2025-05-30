import { ActionReducerMap } from '@ngrx/store';
import {
  Module1InitialState,
  Module1Reducer,
  Module1State,
} from '../../pages/module1/store/reducers';

export interface AppState {
  //States
  module1: Module1State;
}

const initialAppState: AppState = {
  //Initial states
  module1: Module1InitialState,
};

export const reducers: ActionReducerMap<AppState> = {
  //Reducers map
  module1: Module1Reducer,
};

export const PERSISTED_KEYS: (keyof AppState)[] = [
  //Persisted keys
  'module1',
];
