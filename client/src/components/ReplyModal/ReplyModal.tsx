import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Avatar, Typography} from "@material-ui/core";

import {useReplyModalStyles} from "./ReplyModalStyles";
import {formatDate} from "../../util/formatDate";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {User} from "../../store/ducks/user/contracts/state";
import AddTweetForm from "../AddTweetForm/AddTweetForm";
import {textFormatter} from "../../util/textFormatter";
import {Image} from "../../store/ducks/tweets/contracts/state";
import CloseButton from "../CloseButton/CloseButton";

interface ReplyModalProps {
    user: User;
    tweetId: string;
    text: string;
    image?: Image;
    dateTime: string;
    visible?: boolean;
    onClose: () => void;
}

const ReplyModal: FC<ReplyModalProps> = (
    {
        user,
        tweetId,
        text,
        image,
        dateTime,
        visible,
        onClose
    }
): ReactElement | null => {
    const classes = useReplyModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            className={classes.dialogWrapper}
            style={{top: "-10%"}}
            open={visible}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <CloseButton onClose={onClose}/>
            </DialogTitle>
            <DialogContent className={classes.container}>
                <div className={classes.modalWrapper}>
                    <div className={classes.verticalLine}/>
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
                            {textFormatter(text)}
                        </div>
                        {image && (
                            <div className={classes.image}>
                                <img src={image?.src} alt={image?.src}/>
                            </div>
                        )}
                        <object>
                            <Typography className={classes.replyWrapper}>
                                {"Replying to "}
                                <Link to={`/user/${user.id}`} className={classes.replyLink}>
                                    @{user.username}
                                </Link>
                            </Typography>
                        </object>
                    </div>
                </div>
                <div className={classes.addForm}>
                    <AddTweetForm
                        minRows={3}
                        tweetId={tweetId}
                        addressedUsername={user.username}
                        addressedId={user.id}
                        title={"Tweet your reply"}
                        buttonName={"Reply"}
                        onCloseModal={onClose}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReplyModal;
