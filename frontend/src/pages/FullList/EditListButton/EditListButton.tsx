import React, { ReactElement } from "react";
import { Button } from "@material-ui/core";

import { useEditListButtonStyles } from "./EditListButtonStyles";
import EditListModal from "./EditListModal/EditListModal";
import { useModalWindow } from "../../../hook/useModalWindow";

const EditListButton = (): ReactElement => {
    const classes = useEditListButtonStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <Button
                className={classes.listOutlinedButton}
                onClick={onOpenModalWindow}
                variant="outlined"
                color="primary"
                size="small"
            >
                Edit List
            </Button>
            <EditListModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default EditListButton;
