import React, {FC, ReactElement} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import classNames from "classnames";

import {useTweetComponentActionsModalStyles} from "./TweetComponentActionsModalStyles";

interface TweetComponentActionsModalProps {
    modalTitle: string;
    isTweetPinned: boolean;
    visibleTweetComponentActionsModal: boolean;
    onCloseTweetComponentActionsModal: () => void;
    onPinUserTweet: () => void;
    onDeleteUserTweet: () => void;
}

const TweetComponentActionsModal: FC<TweetComponentActionsModalProps> = (
    {
        modalTitle,
        isTweetPinned,
        visibleTweetComponentActionsModal,
        onCloseTweetComponentActionsModal,
        onPinUserTweet,
        onDeleteUserTweet
    }
): ReactElement => {
    const classes = useTweetComponentActionsModalStyles({modalTitle});

    return (
        <Dialog
            open={visibleTweetComponentActionsModal}
            onClose={onCloseTweetComponentActionsModal}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{padding: 0}}>
                <div className={classes.modalWrapper}>
                    <Typography className={classes.modalFullName}>
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
                    <div className={classes.modalUsername}>
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
                    </div>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onCloseTweetComponentActionsModal}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classNames(classes.modalButton,
                                (modalTitle === "Delete") ? (classes.modalDeleteButton) : (classes.modalPrimaryButton)
                            )}
                            onClick={(modalTitle === "Delete") ? onDeleteUserTweet : onPinUserTweet}
                            variant="contained"
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
