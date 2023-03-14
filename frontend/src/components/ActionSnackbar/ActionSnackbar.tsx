import React, { ReactElement } from "react";
import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useActionSnackbarStyles } from "./ActionSnackbarStyles";
import { selectOpenSnackBar, selectSnackBarMessage } from "../../store/ducks/actionSnackbar/selector";
import { setCloseSnackBar } from "../../store/ducks/actionSnackbar/actionCreators";

const ActionSnackbar = (): ReactElement => {
    const classes = useActionSnackbarStyles();
    const dispatch = useDispatch();
    const snackBarMessage = useSelector(selectSnackBarMessage);
    const openSnackBar = useSelector(selectOpenSnackBar);

    return (
        <Snackbar
            className={classes.snackBar}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            open={openSnackBar}
            message={snackBarMessage}
            onClose={() => dispatch(setCloseSnackBar())}
            autoHideDuration={3000}
        />
    );
};

export default ActionSnackbar;
