import React, {FC, memo, ReactElement} from "react";
import {FollowReplyIcon} from "../../../icons";

import {Typography} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

interface TweetReplyConversationProps {
    classes: ClassNameMap<string>;
}

const TweetReplyConversation: FC<TweetReplyConversationProps> = memo(({classes}): ReactElement => {
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
