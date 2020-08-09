import { AnyAction } from "redux";

export interface IAction extends AnyAction {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}

export interface ThemeState {
    backgroundColor: string; 
    color: string 
}

export interface ApplicationState {
    location: string; 
    theme: ThemeState
}
