import React, { FC, ReactElement } from "react";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useLeaveFromConversationModalStyles } from "./LeaveFromConversationModalStyles";

interface LeaveFromConversationModalProps {
    handleLeaveFromConversation: () => void;
    visible?: boolean;
    onClose: () => void;
}

const LeaveFromConversationModal: FC<LeaveFromConversationModalProps> = (
    {
        handleLeaveFromConversation,
        visible,
        onClose
    }
): ReactElement | null => {
    const { t } = useTranslation();
    const classes = useLeaveFromConversationModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogContent style={{ padding: 0 }}>
                <div className={classes.modalWrapper}>
                    <Typography variant={"h5"} component={"div"}>
                        {t("LEAVE_CONVERSATION_QUESTION", { defaultValue: "Leave conversation?" })}
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        {t("LEAVE_CONVERSATION_DESCRIPTION", { defaultValue: "This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it." })}
                    </Typography>
                    <Button
                        className={classes.blockButton}
                        onClick={handleLeaveFromConversation}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        {t("LEAVE", { defaultValue: "Leave" })}
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        {t("CANCEL", { defaultValue: "Cancel" })}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LeaveFromConversationModal;
