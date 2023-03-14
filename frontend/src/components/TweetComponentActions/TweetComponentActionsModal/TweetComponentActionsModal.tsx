import React, { FC, ReactElement } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import { useTweetComponentActionsModalStyles } from "./TweetComponentActionsModalStyles";

interface TweetComponentActionsModalProps {
    modalTitle: string;
    isTweetPinned?: boolean;
    visibleTweetComponentActionsModal: boolean;
    onCloseTweetComponentActionsModal: () => void;
    onClick: () => void;
}

const TweetComponentActionsModal: FC<TweetComponentActionsModalProps> = (
    {
        modalTitle,
        isTweetPinned,
        visibleTweetComponentActionsModal,
        onCloseTweetComponentActionsModal,
        onClick
    }
): ReactElement => {
    const classes = useTweetComponentActionsModalStyles({ modalTitle });

    return (
        <Dialog open={visibleTweetComponentActionsModal} onClose={onCloseTweetComponentActionsModal}>
            <DialogContent style={{ padding: 0 }}>
                <div className={classes.modalWrapper}>
                    <Typography variant={"h5"}>
                        {(modalTitle === "Delete") ? (
                            "Delete Tweet?"
                        ) : (
                            isTweetPinned ? (
                                "Unpin Tweet from profile?"
                            ) : (
                                "Pin Tweet to profile?"
                            )
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(modalTitle === "Delete") ? (
                            "This can’t be undone and it will be removed from your profile, " +
                            "the timeline of any accounts that follow you, and from Twitter search results."
                        ) : (
                            isTweetPinned ? (
                                "This will no longer appear automatically at the top of your profile."
                            ) : (
                                "This will appear at the top of your profile and replace any previously pinned Tweet."
                            )
                        )}
                    </Typography>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onCloseTweetComponentActionsModal}
                            variant="contained"
                            size="large"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={(modalTitle === "Delete") ? (
                                classes.modalDeleteButton
                            ) : (
                                classes.modalPrimaryButton
                            )}
                            onClick={onClick}
                            variant="contained"
                            size="large"
                        >
                            {(modalTitle === "Delete") ? (
                                "Delete"
                            ) : (
                                isTweetPinned ? ("Unpin") : ("Pin")
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetComponentActionsModal;
