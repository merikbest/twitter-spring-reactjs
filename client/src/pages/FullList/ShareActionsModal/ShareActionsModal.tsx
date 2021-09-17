import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, IconButton, List, ListItem} from "@material-ui/core";

import {useShareActionsModalStyles} from "./ShareActionsModalStyles";
import {LinkIcon, MessagesIcon, ShareIcon, TweetThisIcon} from "../../../icons";

const ShareActionsModal: FC = (): ReactElement => {
    const classes = useShareActionsModalStyles();
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                    <IconButton onClick={handleClick}>
                        <>{ShareIcon}</>
                    </IconButton>
                    {open ? (
                        <div className={classes.dropdown}>
                            <List>
                                <ListItem>
                                    <span className={classes.textIcon}>{TweetThisIcon}</span>
                                    <span className={classes.text}>Tweet this</span>
                                </ListItem>
                                <ListItem>
                                    <span className={classes.textIcon}>{MessagesIcon}</span>
                                    <span className={classes.text}>Send via Direct Message</span>
                                </ListItem>
                                <ListItem>
                                    <span className={classes.textIcon}>{LinkIcon}</span>
                                    <span className={classes.text}>Copy link to Tweet</span>
                                </ListItem>
                                <ListItem>
                                    <span className={classes.textIcon}>{ShareIcon}</span>
                                    <span className={classes.text}>Share Tweet via ...</span>
                                </ListItem>
                            </List>
                        </div>
                    ) : null}
                </div>
            </ClickAwayListener>
        </>
    );
};

export default ShareActionsModal;
