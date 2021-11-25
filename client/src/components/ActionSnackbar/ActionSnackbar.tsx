import React, {FC, ReactElement} from 'react';
import {Snackbar} from "@material-ui/core";

import {useActionSnackbarStyles} from "./ActionSnackbarStyles";

interface ActionSnackbarProps {
    snackBarMessage: string;
    openSnackBar: boolean;
    onCloseSnackBar: () => void;
}

const ActionSnackbar: FC<ActionSnackbarProps> = ({snackBarMessage, openSnackBar, onCloseSnackBar}): ReactElement => {
    const classes = useActionSnackbarStyles();

    return (
        <>
            <Snackbar
                className={classes.snackBar}
                anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                open={openSnackBar}
                message={snackBarMessage}
                onClose={onCloseSnackBar}
                autoHideDuration={3000}
            />
        </>
    );
};

export default ActionSnackbar;
