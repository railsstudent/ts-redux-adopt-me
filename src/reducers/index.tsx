import { combineReducers, Reducer } from 'redux';
import location from './location';
import theme from './theme';
import { ApplicationState } from './interface';

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    location,
    theme
})

export * from './interface';
