import React, {FC, ReactElement} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import {useQuoteTweetModalStyles} from "./QuoteTweetModalStyles";
import AddTweetForm from "../../AddTweetForm/AddTweetForm";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import CloseButton from "../../CloseButton/CloseButton";

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
                <CloseButton onClose={onClose}/>
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
