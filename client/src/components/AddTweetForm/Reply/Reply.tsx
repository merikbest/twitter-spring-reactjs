import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, Divider, List, ListItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {useReplyStyles} from "./ReplyStyles";
import {EveryoneReplyIcon, FollowReplyIcon, MentionReplyIcon} from "../../../icons";

enum ReplyOption {
    EVERYONE = "Everyone can reply",
    FOLLOW = "People you follow",
    MENTION = "Only people you mention"
}

const Reply: FC = (): ReactElement => {
    const classes = useReplyStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [replyOption, setReplyOption] = useState<ReplyOption>(ReplyOption.EVERYONE);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.reply}>
                    <Button onClick={handleClick} type="submit" color="primary">
                        <span>{EveryoneReplyIcon}</span>{replyOption}
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
                                <ListItem className={classes.listItem} button>
                                    <span>{EveryoneReplyIcon}</span>{ReplyOption.EVERYONE}
                                </ListItem>
                                <ListItem className={classes.listItem} button>
                                    <span>{FollowReplyIcon}</span>{ReplyOption.FOLLOW}
                                </ListItem>
                                <ListItem className={classes.listItem} button>
                                    <span>{MentionReplyIcon}</span>{ReplyOption.MENTION}
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
