import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useDeletePhoneNumberButtonStyles } from "./DeletePhoneNumberButtonStyles";
import { useModalWindow } from "../../../../../../hook/useModalWindow";
import DeletePhoneModal from "./DeletePhoneModal/DeletePhoneModal";

const DeletePhoneNumberButton: FC = (): ReactElement => {
    const classes = useDeletePhoneNumberButtonStyles();
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <div id="openDeletePhoneModal" className={classes.deletePhoneNumber} onClick={onOpenModalWindow}>
            <Typography variant="body1" component="span">
                {t("DELETE_PHONE_NUMBER", { defaultValue: "Delete phone number" })}
            </Typography>
            <DeletePhoneModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default DeletePhoneNumberButton;
