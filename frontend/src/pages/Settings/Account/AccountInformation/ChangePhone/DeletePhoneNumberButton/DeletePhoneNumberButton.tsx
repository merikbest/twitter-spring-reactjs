import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useDeletePhoneNumberButtonStyles } from "./DeletePhoneNumberButtonStyles";
import { useModalWindow } from "../../../../../../hook/useModalWindow";
import DeletePhoneModal from "./DeletePhoneModal/DeletePhoneModal";

const DeletePhoneNumberButton: FC = (): ReactElement => {
    const classes = useDeletePhoneNumberButtonStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <div id={"openDeletePhoneModal"} className={classes.deletePhoneNumber} onClick={onOpenModalWindow}>
            <Typography variant={"body1"} component={"span"}>
                Delete phone number
            </Typography>
            <DeletePhoneModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default DeletePhoneNumberButton;
