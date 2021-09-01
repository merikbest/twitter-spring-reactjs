import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, Divider, List, ListItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {useReplyStyles} from "./ReplyStyles";
import {
    CheckIcon,
    EveryoneReplyIcon,
    EveryoneReplyOutlinedIcon,
    FollowReplyIcon,
    FollowReplyOutlinedIcon,
    MentionReplyIcon,
    MentionReplyOutlinedIcon
} from "../../../icons";
import {ReplyType} from "../../../store/ducks/tweets/contracts/state";

interface ReplyProps {
    replyType: ReplyType;
    setReplyType: (value: ReplyType | ((prevVar: ReplyType) => ReplyType)) => void;
}

const Reply: FC<ReplyProps> = ({replyType, setReplyType}): ReactElement => {
    const classes = useReplyStyles();
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const handleListItemClick = (reply: ReplyType): void => {
        setReplyType(reply);
        setOpen(false);
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.reply}>
                    <Button onClick={handleClick} type="submit" color="primary">
                        <span>
                            {replyType === ReplyType.EVERYONE && EveryoneReplyIcon}
                            {replyType === ReplyType.FOLLOW && FollowReplyIcon}
                            {replyType === ReplyType.MENTION && MentionReplyIcon}
                        </span>
                        <span>
                            {replyType === ReplyType.EVERYONE && "Everyone can reply"}
                            {replyType === ReplyType.FOLLOW && "People you follow"}
                            {replyType === ReplyType.MENTION && "Only people you mention"}
                        </span>
                    </Button>
                    <Divider/>
                    {open ? (
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
                                    onClick={() => handleListItemClick(ReplyType.EVERYONE)}
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
                                    onClick={() => handleListItemClick(ReplyType.FOLLOW)}
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
                                    onClick={() => handleListItemClick(ReplyType.MENTION)}
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
            </ClickAwayListener>
        </>
    );
};

export default Reply;
