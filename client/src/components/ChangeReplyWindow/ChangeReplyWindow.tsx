import React, {FC, ReactElement} from 'react';
import {List, ListItem, Typography} from "@material-ui/core";

import {useChangeReplyWindowStyles} from "./ChangeReplyWindowStyles";
import {ReplyType} from "../../store/ducks/tweets/contracts/state";
import {CheckIcon, EveryoneReplyOutlinedIcon, FollowReplyOutlinedIcon, MentionReplyOutlinedIcon} from "../../icons";

interface ChangeReplyWindowProps {
    replyType: ReplyType;
    onChangeTweetReplyType: (replyType: ReplyType) => void
}

const ChangeReplyWindow: FC<ChangeReplyWindowProps> = ({replyType, onChangeTweetReplyType}): ReactElement => {
    const classes = useChangeReplyWindowStyles();

    return (
        <div className={classes.dropdown}>
            <div className={classes.infoWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Who can reply?
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    Choose who can reply to this Tweet.
                    Anyone mentioned can always reply.
                </Typography>
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
                    <Typography variant={"body1"} component={"span"}>
                        Everyone
                    </Typography>
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
                    <Typography variant={"body1"} component={"span"}>
                        People you follow
                    </Typography>
                    {(replyType === ReplyType.FOLLOW) && (
                        <span className={classes.checkIcon}>
                            {CheckIcon}
                        </span>
                    )}
                </ListItem>
                <ListItem
                    id={"lastItem"}
                    className={classes.listItem}
                    onClick={() => onChangeTweetReplyType(ReplyType.MENTION)}
                    button
                >
                    <div className={classes.iconCircle}>
                        <span className={classes.icon}>
                            {MentionReplyOutlinedIcon}
                        </span>
                    </div>
                    <Typography variant={"body1"} component={"span"}>
                        Only people you mention
                    </Typography>
                    {(replyType === ReplyType.MENTION) && (
                        <span className={classes.checkIcon}>
                            {CheckIcon}
                        </span>
                    )}
                </ListItem>
            </List>
        </div>
    );
};

export default ChangeReplyWindow;
