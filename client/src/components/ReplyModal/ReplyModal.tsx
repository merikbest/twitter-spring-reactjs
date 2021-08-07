import React, {FC, ReactElement, useEffect} from 'react';
import {Link} from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Avatar, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import {useReplyModalStyles} from "./ReplyModalStyles";
import {formatDate} from "../../util/formatDate";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {User} from "../../store/ducks/user/contracts/state";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import {useSelector} from "react-redux";
import {selectIsTweetLoaded} from "../../store/ducks/tweet/selectors";
import {textFormatter} from "../../util/textFormatter";
import {Image} from "../../store/ducks/tweets/contracts/state";

interface ReplyModalProps {
    user: User;
    tweetId: string;
    text: string;
    image?: Image;
    dateTime: string;
    visible?: boolean;
    onClose: () => void;
}

const ReplyModal: FC<ReplyModalProps> = ({
                                             user,
                                             tweetId,
                                             text,
                                             image,
                                             dateTime,
                                             visible,
                                             onClose
                                         }): ReactElement | null => {
    const classes = useReplyModalStyles();
    const isReplyLoaded = useSelector(selectIsTweetLoaded);

    useEffect(() => {
        onClose();
    }, [isReplyLoaded]);

    if (!visible) {
        return null;
    }

    return (
        <Dialog style={{top: "-30%"}} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{padding: "5px 15px", margin: 0}}>
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.container}>
                <div className={classes.modalWrapper}>
                    <div className={classes.verticalLine}></div>
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
                                Replying to <Link to={`/user/${user.id}`} className={classes.replyLink}>
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
                        title={"Tweet your reply"}
                        buttonName={"Reply"}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReplyModal;
