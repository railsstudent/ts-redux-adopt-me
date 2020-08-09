import { IAction } from "./interface";

export default function location(state = 'Seattle, WA', action: IAction) {
    switch (action.type) {
        case 'CHANGED_LOCATION':
            return action.payload
        default:
            return state
    }
}