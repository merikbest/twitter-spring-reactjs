import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { ReplyType } from "../../../types/common";
import { FollowReplyIcon, MentionReplyIcon } from "../../../icons";
import { selectTweetReplyType, selectTweetAuthorFullName } from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";

const TweetReplyInfo = (): ReactElement => {
    const classes = useFullTweetStyles();
    const replyType = useSelector(selectTweetReplyType);
    const tweetAuthorFullName = useSelector(selectTweetAuthorFullName);

    return (
        <>
            {(replyType === ReplyType.FOLLOW || replyType === ReplyType.MENTION) && (
                <Paper variant="outlined" className={classes.replyInfoWrapper}>
                    <div className={classes.replyInfo}>
                        <div className={classes.iconWrapper}>
                            <div className={classes.iconCircle}>
                                <span className={classes.icon}>
                                    {(replyType === ReplyType.FOLLOW) && (FollowReplyIcon)}
                                    {(replyType === ReplyType.MENTION) && (MentionReplyIcon)}
                                </span>
                            </div>
                        </div>
                        <div className={classes.replyTextInfoWrapper}>
                            <Typography variant={"h6"} component={"div"}>
                                Who can reply?
                            </Typography>
                            <Typography variant={"body1"} component={"div"}>
                                People @{tweetAuthorFullName}
                                {(replyType === ReplyType.FOLLOW) ? (" follows or ") : (" ")}
                                mentioned can reply
                            </Typography>
                        </div>
                    </div>
                </Paper>
            )}
        </>
    );
};

export default TweetReplyInfo;
