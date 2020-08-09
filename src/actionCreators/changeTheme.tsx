import { ActionCreator } from "redux";
import { IAction, ThemeState } from "../reducers";

const changeTheme: ActionCreator<IAction> = (theme: ThemeState) => {
    return {
        type: 'CHANGED_THEME',
        payload: theme
    };
}

export default changeTheme;  
