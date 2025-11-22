import React, { FC, ReactElement } from "react";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useEditBirthDateModalStyles } from "./EditBirthDateModalStyles";

interface EditBirthDateModalProps {
    visibleEditBirthDateModal: boolean;
    onCloseEditBirthDateModal: () => void;
    onOpenEditBirthDateForm: () => void;
}

const EditBirthDateModal: FC<EditBirthDateModalProps> = (
    {
        visibleEditBirthDateModal,
        onCloseEditBirthDateModal,
        onOpenEditBirthDateForm
    }
): ReactElement => {
    const classes = useEditBirthDateModalStyles();
    const { t } = useTranslation();

    return (
        <Dialog
            className={classes.dialog}
            open={visibleEditBirthDateModal}
            onClick={(event) => event.preventDefault()}
            onClose={onCloseEditBirthDateModal}
        >
            <DialogContent>
                <Typography variant="h5" component="div">
                    {t("EDIT_DATE_OF_BIRTH", { defaultValue: "Edit date of birth?" })}
                </Typography>
                <Typography variant="subtitle1" component="div" className={classes.text}>
                    {t("EDIT_DATE_OF_BIRTH_DESCRIPTION", {
                        defaultValue: "This can only be changed a few times. " +
                            "Make sure you enter the age of the person using the account."
                    })}
                </Typography>
                <Button
                    onClick={onOpenEditBirthDateForm}
                    className={classes.editButton}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    {t("EDIT", { defaultValue: "Edit" })}
                </Button>
                <Button
                    onClick={onCloseEditBirthDateModal}
                    color="primary"
                    variant="outlined"
                    size="large"
                    fullWidth
                >
                    {t("CANCEL", { defaultValue: "Cancel" })}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditBirthDateModal;
