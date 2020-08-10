import { ActionCreator } from "redux";
import { IAction } from "../reducers";

export const changePlace: ActionCreator<IAction> = (place: string) => {
    return {
        type: 'CHANGED_LOCATION',
        payload: place
    };
}

