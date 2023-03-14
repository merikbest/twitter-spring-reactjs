import { RootState } from "../../store";
import { ActionSnackbarState } from "./contracts/state";

export const selectActionSnackbarState = (state: RootState): ActionSnackbarState => state.actionSnackbar;
export const selectSnackBarMessage = (state: RootState): string => selectActionSnackbarState(state).snackBarMessage;
export const selectOpenSnackBar = (state: RootState): boolean => selectActionSnackbarState(state).openSnackBar;
