import React, {FC, ReactElement} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {useTweetPinModalStyles} from "./TweetPinModalStyles";

interface TweetPinModalProps {
    isTweetPinned: boolean;
    visibleTweetPinModal: boolean;
    onCloseTweetPinModal: () => void;
    onPinUserTweet: () => void;
}

const TweetPinModal: FC<TweetPinModalProps> = ({
                                                   isTweetPinned,
                                                   visibleTweetPinModal,
                                                   onCloseTweetPinModal,
                                                   onPinUserTweet
                                               }): ReactElement => {
    const classes = useTweetPinModalStyles();

    return (
        <Dialog open={visibleTweetPinModal} onClose={onCloseTweetPinModal} aria-labelledby="form-dialog-title">
            <DialogContent style={{padding: "0px 0px"}}>
                <div className={classes.modalWrapper}>
                    <Typography className={classes.modalFullName}>
                        {isTweetPinned ? "Unpin Tweet from profile?" : "Pin Tweet to profile?"}
                    </Typography>
                    <div className={classes.modalUsername}>
                        {isTweetPinned ? (
                            "This will no longer appear automatically at the top of your profile."
                        ) : (
                            "This will appear at the top of your profile and replace any previously pinned Tweet."
                        )}
                    </div>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onCloseTweetPinModal}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.modalPinButton}
                            onClick={onPinUserTweet}
                            variant="contained"
                            color="primary"
                        >
                            {isTweetPinned ? "Unpin" : "Pin"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetPinModal;
