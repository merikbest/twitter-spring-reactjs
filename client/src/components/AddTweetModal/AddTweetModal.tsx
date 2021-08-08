import React, {FC, ReactElement, useEffect} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {useSelector} from "react-redux";

import {useAddTweetModalStyles} from "./AddTweetModalStyles";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import {selectIsTweetsLoaded} from "../../store/ducks/tweets/selectors";

interface AddTweetModalProps {
    title?: string;
    visible?: boolean;
    onClose: () => void;
}

const AddTweetModal: FC<AddTweetModalProps> = ({title, visible, onClose}): ReactElement | null => {
    const classes = useAddTweetModalStyles();
    const isTweetAdded = useSelector(selectIsTweetsLoaded);

    useEffect(() => {
        onClose();
    }, [isTweetAdded]);

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.content} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.header} id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon color="secondary"/>
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <AddTweetForm
                    maxRows={6}
                    minRows={6}
                    title={"What's happening?"}
                    buttonName={"Tweet"}/>
            </DialogContent>
        </Dialog>
    );
};

export default AddTweetModal;
