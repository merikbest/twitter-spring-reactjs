import React, { ReactElement } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useTranslation } from "react-i18next";

import { useDeleteListModalStyles } from "./DeleteListModalStyles";
import { useDeleteListModal } from "./useDeleteListModal";

const DeleteListModal = (): ReactElement => {
    const classes = useDeleteListModalStyles();
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow, onDeleteList } = useDeleteListModal();

    return (
        <>
            <Typography
                id="onOpenDeleteListModal"
                className={classes.deleteList}
                onClick={onOpenModalWindow}
                variant="body1"
                component="div"
            >
                {t("DELETE_LIST", { defaultValue: "Delete List" })}
            </Typography>
            <Dialog open={visibleModalWindow} onClose={onCloseModalWindow}>
                <DialogContent style={{ padding: 0 }}>
                    <div className={classes.modalWrapper}>
                        <Typography variant="h5" component="div">
                            {t("DELETE_LIST_TITLE", { defaultValue: "Delete List?" })}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            {t("DELETE_LIST_DESCRIPTION", {
                                defaultValue: "This can’t be undone and you’ll lose your List." })}
                        </Typography>
                        <div className={classes.modalButtonWrapper}>
                            <Button
                                className={classes.modalCancelButton}
                                onClick={onCloseModalWindow}
                                variant="contained"
                                size="large"
                            >
                                {t("CANCEL", { defaultValue: "Cancel" })}
                            </Button>
                            <Button
                                className={classes.modalDeleteButton}
                                onClick={onDeleteList}
                                variant="contained"
                                size="large"
                            >
                                {t("DELETE", { defaultValue: "Delete" })}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DeleteListModal;
