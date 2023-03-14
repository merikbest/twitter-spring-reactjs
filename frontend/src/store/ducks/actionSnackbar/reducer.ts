import produce, { Draft } from "immer";

import { ActionSnackbarActions, ActionSnackbarTypes } from "./contracts/actionTypes";
import { ActionSnackbarState } from "./contracts/state";

export const initialActionSnackbarState: ActionSnackbarState = {
    snackBarMessage: "",
    openSnackBar: false
};

export const actionSnackbarReducer = produce((draft: Draft<ActionSnackbarState>, action: ActionSnackbarActions) => {
    switch (action.type) {
        case ActionSnackbarTypes.SET_OPEN_SNACKBAR:
            draft.snackBarMessage = action.payload;
            draft.openSnackBar = true;
            break;

        case ActionSnackbarTypes.SET_CLOSE_SNACKBAR:
            draft.openSnackBar = false;
            break;

        default:
            break;
    }
}, initialActionSnackbarState);
