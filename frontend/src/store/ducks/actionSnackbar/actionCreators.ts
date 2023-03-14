import {
    ActionSnackbarTypes,
    SetCloseSnackBarActionInterface,
    SetOpenSnackBarActionInterface
} from "./contracts/actionTypes";

export const setOpenSnackBar = (payload: string): SetOpenSnackBarActionInterface => ({
    type: ActionSnackbarTypes.SET_OPEN_SNACKBAR,
    payload
});

export const setCloseSnackBar = (): SetCloseSnackBarActionInterface => ({
    type: ActionSnackbarTypes.SET_CLOSE_SNACKBAR
});
