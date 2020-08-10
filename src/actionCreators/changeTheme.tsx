import { ActionCreator } from "redux";
import { IAction, ThemeState } from "../reducers";

export const changeTheme: ActionCreator<IAction> = (theme: ThemeState) => {
    return {
        type: 'CHANGED_THEME',
        payload: theme
    };
}

