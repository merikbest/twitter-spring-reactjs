import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, IconButton, List, ListItem, Typography} from "@material-ui/core";

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
                                    <>{TweetThisIcon}</>
                                    <Typography component={"span"} className={classes.text}>
                                        Tweet this
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <>{MessagesIcon}</>
                                    <Typography component={"span"} className={classes.text}>
                                        Send via Direct Message
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <>{LinkIcon}</>
                                    <Typography component={"span"} className={classes.text}>
                                        Copy link to List
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <>{ShareIcon}</>
                                    <Typography component={"span"} className={classes.text}>
                                        Share List
                                    </Typography>
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
