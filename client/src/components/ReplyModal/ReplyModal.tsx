import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Avatar, Link as MuiLink, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useReplyModalStyles} from "./ReplyModalStyles";
import {formatDate} from "../../util/formatDate";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import AddTweetForm from "../AddTweetForm/AddTweetForm";
import {textFormatter} from "../../util/textFormatter";
import {Image} from "../../store/types/common";
import CloseButton from "../CloseButton/CloseButton";
import {useGlobalStyles} from "../../util/globalClasses";
import {UserTweetResponse} from "../../store/types/tweet";

interface ReplyModalProps {
    user: UserTweetResponse;
    tweetId: number;
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
    const globalClasses = useGlobalStyles();
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
                        className={classnames(globalClasses.avatar, classes.avatar)}
                        alt={`avatar ${user.id}`}
                        src={user.avatar?.src ? user.avatar?.src : DEFAULT_PROFILE_IMG}
                    />
                    <div>
                        <div className={classes.header}>
                            <div>
                                <Typography variant={"h6"} component={"span"}>
                                    {user.fullName}
                                </Typography>&nbsp;
                                <Typography variant={"subtitle1"} component={"span"}>
                                    @{user.username}
                                </Typography>&nbsp;
                                <Typography variant={"subtitle1"} component={"span"}>·</Typography>&nbsp;
                                <Typography variant={"subtitle1"} component={"span"}>
                                    {formatDate(new Date(dateTime))}
                                </Typography>
                            </div>
                        </div>
                        <Typography variant={"body1"} component={"div"} className={classes.text}>
                            {textFormatter(text)}
                        </Typography>
                        {image && (
                            <div className={classes.image}>
                                <img src={image?.src} alt={image?.src}/>
                            </div>
                        )}
                        <object>
                            <Typography variant={"subtitle1"} component={"div"} className={classes.replyWrapper}>
                                {"Replying to "}
                                <MuiLink variant="subtitle1" to={`/profile/${user.id}`} component={Link}>
                                    @{user.username}
                                </MuiLink>
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
