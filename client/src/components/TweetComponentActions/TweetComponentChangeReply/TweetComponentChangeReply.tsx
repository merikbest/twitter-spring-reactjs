import React, {FC, ReactElement} from 'react';
import {List, ListItem} from "@material-ui/core";

import {useTweetComponentChangeReplyStyles} from "./TweetComponentChangeReplyStyles";
import {
    CheckIcon,
    EveryoneReplyOutlinedIcon,
    FollowReplyOutlinedIcon,
    MentionReplyOutlinedIcon
} from "../../../icons";
import {ReplyType} from "../../../store/ducks/tweets/contracts/state";

interface TweetComponentChangeReplyProps {
    replyType: ReplyType;
    openChangeReplyDropdown: boolean;
    onChangeTweetReplyType: (replyType: ReplyType) => void
}

const TweetComponentChangeReply: FC<TweetComponentChangeReplyProps> = (
    {
        replyType,
        openChangeReplyDropdown,
        onChangeTweetReplyType
    }
): ReactElement => {
    const classes = useTweetComponentChangeReplyStyles();

    return (
        <div>
            {openChangeReplyDropdown ? (
                <div className={classes.dropdown}>
                    <div className={classes.infoWrapper}>
                        <div className={classes.title}>
                            Who can reply?
                        </div>
                        <div className={classes.text}>
                            Choose who can reply to this Tweet.
                            Anyone mentioned can always reply.
                        </div>
                    </div>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem
                            className={classes.listItem}
                            onClick={() => onChangeTweetReplyType(ReplyType.EVERYONE)}
                            button
                        >
                            <div className={classes.iconCircle}>
                                <span className={classes.icon}>
                                    {EveryoneReplyOutlinedIcon}
                                </span>
                            </div>
                            <span>Everyone</span>
                            {(replyType === ReplyType.EVERYONE) && (
                                <span className={classes.checkIcon}>
                                    {CheckIcon}
                                </span>
                            )}
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            onClick={() => onChangeTweetReplyType(ReplyType.FOLLOW)}
                            button
                        >
                            <div className={classes.iconCircle}>
                                <span className={classes.icon}>
                                    {FollowReplyOutlinedIcon}
                                </span>
                            </div>
                            <span>People you follow</span>
                            {(replyType === ReplyType.FOLLOW) && (
                                <span className={classes.checkIcon}>
                                    {CheckIcon}
                                </span>
                            )}
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            onClick={() => onChangeTweetReplyType(ReplyType.MENTION)}
                            button
                        >
                            <div className={classes.iconCircle}>
                                <span className={classes.icon}>
                                    {MentionReplyOutlinedIcon}
                                </span>
                            </div>
                            <span>Only people you mention</span>
                            {(replyType === ReplyType.MENTION) && (
                                <span className={classes.checkIcon}>
                                    {CheckIcon}
                                </span>
                            )}
                        </ListItem>
                    </List>
                </div>
            ) : null}
        </div>
    );
};

export default TweetComponentChangeReply;
