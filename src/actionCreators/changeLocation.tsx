import { ActionCreator } from "redux";
import { IAction } from "../reducers";

const changeLocation: ActionCreator<IAction> = (location: string) => {
    return {
        type: 'CHANGED_LOCATION',
        payload: location
    };
}

export default changeLocation;  
