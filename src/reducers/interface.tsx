export interface IAction {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}