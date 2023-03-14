import { actionSnackbarReducer, initialActionSnackbarState } from "../reducer";
import { ActionSnackbarActions, ActionSnackbarTypes } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";

describe("actionSnackbarReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(actionSnackbarReducer(undefined, {} as ActionSnackbarActions)).toEqual(initialActionSnackbarState);
        });
    });

    describe("actionSnackbar handlers:", () => {
        testActionDispatch(
            ActionSnackbarTypes.SET_OPEN_SNACKBAR,
            actionSnackbarReducer(initialActionSnackbarState, {
                type: ActionSnackbarTypes.SET_OPEN_SNACKBAR,
                payload: "test_message"
            }),
            {
                ...initialActionSnackbarState,
                snackBarMessage: "test_message",
                openSnackBar: true
            }
        );

        testActionDispatch(
            ActionSnackbarTypes.SET_CLOSE_SNACKBAR,
            actionSnackbarReducer(initialActionSnackbarState, {
                type: ActionSnackbarTypes.SET_CLOSE_SNACKBAR
            }),
            {
                ...initialActionSnackbarState,
                openSnackBar: false
            }
        );
    });
});
