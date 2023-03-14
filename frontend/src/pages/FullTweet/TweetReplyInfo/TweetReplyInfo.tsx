import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { ReplyType } from "../../../types/common";
import { FollowReplyIcon, MentionReplyIcon } from "../../../icons";
import { selectTweetReplyType, selectTweetUserFullName } from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";

const TweetReplyInfo = (): ReactElement => {
    const classes = useFullTweetStyles();
    const replyType = useSelector(selectTweetReplyType);
    const tweetUserFullName = useSelector(selectTweetUserFullName);

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
                                People @{tweetUserFullName}
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
