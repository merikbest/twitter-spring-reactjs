import { testAction } from "../../../../util/test-utils/test-helper";
import { setCloseSnackBar, setOpenSnackBar } from "../actionCreators";
import { ActionSnackbarTypes } from "../contracts/actionTypes";

describe("actionSnackbar actions", () => {
    testAction(setOpenSnackBar, setOpenSnackBar("test_message"), {
        type: ActionSnackbarTypes.SET_OPEN_SNACKBAR,
        payload: "test_message"
    });

    testAction(setCloseSnackBar, setCloseSnackBar(), {
        type: ActionSnackbarTypes.SET_CLOSE_SNACKBAR
    });
});
