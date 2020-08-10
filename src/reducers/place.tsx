import { Reducer, AnyAction } from "redux";

const initialState = 'Seattle, WA';

const place: Reducer<string> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'CHANGED_LOCATION':
            return action.payload
        default:
            return state
    }
};

export default place;
