import React, {FC, ReactElement} from 'react';
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

interface AddTweetModalProps {
    title?: string;
    visible?: boolean;
    onClose: () => void;
}

const AddTweetModal: FC<AddTweetModalProps> = ({title, visible, onClose}): ReactElement | null => {

    if (!visible) {
        return null;
    }

    return (
        <Dialog style={{top: "-20%"}} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent style={{width: 598, minHeight: 230, padding: "0px 20px"}}>
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
