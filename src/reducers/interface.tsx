import { AnyAction, Action } from "redux";

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
    place: string; 
    theme: ThemeState
}

export type ConnectDispatch =  (action: Action) => void
