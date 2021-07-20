import React, {FC} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Avatar, Menu, MenuItem, Paper} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import {useReplyModalStyles} from "./ReplyModalStyles";
import {formatDate} from "../../util/formatDate";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {User} from "../../store/ducks/user/contracts/state";

interface ReplyModalProps {
    user: User;
    text: string;
    dateTime: string;
    visible?: boolean;
    onClose: () => void;
}

const ReplyModal: FC<ReplyModalProps> = ({user, text, dateTime, visible, onClose}) => {
    const classes = useReplyModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{margin: 0}}>
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
            </DialogTitle>
            <DialogContent style={{height: 550, width: 598, padding: 0,}}>
                <Paper className={classes.container} variant="outlined">
                    <Avatar
                        className={classes.avatar}
                        alt={`avatar ${user.id}`}
                        src={user.avatar?.src ? user.avatar?.src : DEFAULT_PROFILE_IMG}
                    />
                    <div>
                        <div className={classes.header}>
                            <div>
                                <b>{user.fullName}</b>&nbsp;
                                <span>@{user.username}</span>&nbsp;
                                <span>·</span>&nbsp;
                                <span>{formatDate(new Date(dateTime))}</span>
                            </div>
                        </div>
                        <div className={classes.text}>
                            <div dangerouslySetInnerHTML={{__html: text}}></div>
                        </div>
                    </div>
                </Paper>
            </DialogContent>
        </Dialog>
    );
};

export default ReplyModal;
