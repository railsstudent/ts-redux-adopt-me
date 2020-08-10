import { AnyAction, Reducer } from "redux";
import { ThemeState } from "./interface";

const initialState: ThemeState = {
    backgroundColor: 'darkblue',
    color: 'peru'
}

const theme: Reducer<ThemeState> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CHANGED_THEME':
            return action.payload
        default:
            return state   
    }
}

export default theme
