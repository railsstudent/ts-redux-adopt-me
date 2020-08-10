import { combineReducers, Reducer } from 'redux';
import place from './place';
import theme from './theme';
import { ApplicationState } from './interface';

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    place,
    theme
})

export * from './interface';
