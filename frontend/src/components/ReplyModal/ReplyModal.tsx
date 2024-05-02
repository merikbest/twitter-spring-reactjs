import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Avatar, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useReplyModalStyles } from "./ReplyModalStyles";
import { formatDate } from "../../util/format-date-helper";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import AddTweetForm from "../AddTweetForm/AddTweetForm";
import { textFormatter } from "../../util/text-formatter";
import { Image } from "../../types/common";
import { useGlobalStyles } from "../../util/globalClasses";
import { UserTweetResponse } from "../../types/tweet";
import { PROFILE } from "../../constants/path-constants";
import DialogTitleComponent from "../DialogTitleComponent/DialogTitleComponent";

interface ReplyModalProps {
    author: UserTweetResponse;
    tweetId: number;
    text: string;
    image?: Image;
    createdAt: string;
    visible?: boolean;
    onClose: () => void;
}

const ReplyModal: FC<ReplyModalProps> = (
    {
        author,
        tweetId,
        text,
        image,
        createdAt,
        visible,
        onClose
    }
): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useReplyModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialogWrapper} open={visible} onClose={onClose}>
            <DialogTitleComponent onClose={onClose} />
            <DialogContent className={classes.container}>
                <div className={classes.modalWrapper}>
                    <div className={classes.verticalLine} />
                    <Avatar
                        className={classnames(globalClasses.avatar, classes.avatar)}
                        alt={`avatar ${author.id}`}
                        src={author.avatar ?? DEFAULT_PROFILE_IMG}
                    />
                    <div>
                        <div className={classes.header}>
                            <div>
                                <Typography variant={"h6"} component={"span"}>
                                    {author.fullName}
                                </Typography>&nbsp;
                                <Typography variant={"subtitle1"} component={"span"}>
                                    @{author.username}
                                </Typography>&nbsp;
                                <Typography variant={"subtitle1"} component={"span"}>·</Typography>&nbsp;
                                <Typography variant={"subtitle1"} component={"span"}>
                                    {formatDate(new Date(createdAt))}
                                </Typography>
                            </div>
                        </div>
                        <Typography variant={"body1"} component={"div"} className={classes.text}>
                            {textFormatter(text)}
                        </Typography>
                        {image && (
                            <div className={classes.image}>
                                <img src={image?.src} alt={image?.src} />
                            </div>
                        )}
                        <object>
                            <Typography variant={"subtitle1"} component={"div"} className={classes.replyWrapper}>
                                {"Replying to "}
                                <MuiLink variant="subtitle1" to={`${PROFILE}/${author.id}`} component={Link}>
                                    @{author.username}
                                </MuiLink>
                            </Typography>
                        </object>
                    </div>
                </div>
                <div className={classes.addForm}>
                    <AddTweetForm
                        minRows={3}
                        tweetId={tweetId}
                        addressedUsername={author.username}
                        addressedId={author.id}
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
