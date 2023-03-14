import React, { memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { FollowReplyIcon } from "../../../icons";
import { useTweetReplyConversationStyles } from "./TweetReplyConversationStyles";

const TweetReplyConversation = memo((): ReactElement => {
    const classes = useTweetReplyConversationStyles();

    return (
        <>
            <div className={classes.iconWrapper}>
                <div className={classes.iconCircle}>
                    <span className={classes.icon}>
                        {FollowReplyIcon}
                    </span>
                </div>
            </div>
            <Typography variant={"subtitle2"} component={"span"}>
                You can reply to this conversation
            </Typography>
        </>
    );
});

export default TweetReplyConversation;
