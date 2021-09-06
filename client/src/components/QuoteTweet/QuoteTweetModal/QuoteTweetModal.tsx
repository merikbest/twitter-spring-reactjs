import React, {FC, ReactElement} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import {useQuoteTweetModalStyles} from "./QuoteTweetModalStyles";
import {AddTweetForm} from "../../AddTweetForm/AddTweetForm";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";

interface QuoteTweetModalProps {
    quoteTweet: Tweet;
    visible?: boolean;
    onClose: () => void;
}

const QuoteTweetModal: FC<QuoteTweetModalProps> = ({quoteTweet, visible, onClose}): ReactElement | null => {
    const classes = useQuoteTweetModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.content} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.header} id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon color="secondary"/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <AddTweetForm
                    quoteTweet={quoteTweet}
                    minRows={1}
                    title={"Add a comment"}
                    buttonName={"Tweet"}
                    onCloseModal={onClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default QuoteTweetModal;
