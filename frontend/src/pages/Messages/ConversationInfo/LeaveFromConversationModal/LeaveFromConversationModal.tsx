import React, { FC, ReactElement } from "react";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";

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
    const classes = useLeaveFromConversationModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogContent style={{ padding: 0 }}>
                <div className={classes.modalWrapper}>
                    <Typography variant={"h5"} component={"div"}>
                        Leave conversation?
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        This conversation will be deleted from your inbox. Other people in the conversation will still
                        be able to see it.
                    </Typography>
                    <Button
                        className={classes.blockButton}
                        onClick={handleLeaveFromConversation}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Leave
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LeaveFromConversationModal;
