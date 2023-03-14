import { Action } from "redux";

export enum ActionSnackbarTypes {
    SET_OPEN_SNACKBAR = "actionSnackbar/SET_OPEN_SNACKBAR",
    SET_CLOSE_SNACKBAR = "actionSnackbar/SET_CLOSE_SNACKBAR",
}

export interface SetOpenSnackBarActionInterface extends Action<ActionSnackbarTypes> {
    type: ActionSnackbarTypes.SET_OPEN_SNACKBAR;
    payload: string;
}

export interface SetCloseSnackBarActionInterface extends Action<ActionSnackbarTypes> {
    type: ActionSnackbarTypes.SET_CLOSE_SNACKBAR;
}

export type ActionSnackbarActions = SetOpenSnackBarActionInterface | SetCloseSnackBarActionInterface;
