import { IAction } from "./interface";

export default function theme(state = { backgroundColor: 'green', color: 'black' }, action: IAction) {
    switch (action.type) {
        case 'CHANGED_THEME':
            return action.payload
        default:
            return state
    }
}