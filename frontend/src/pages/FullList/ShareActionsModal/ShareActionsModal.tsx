import React, { ReactElement } from "react";
import { ClickAwayListener, List, ListItem, Typography } from "@material-ui/core";

import { useShareActionsModalStyles } from "./ShareActionsModalStyles";
import { LinkIcon, MessagesIcon, ShareIcon, TweetThisIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useClickAway } from "../../../hook/useClickAway";

const ShareActionsModal = (): ReactElement => {
    const classes = useShareActionsModalStyles();
    const { open, onClickOpen, onClickClose } = useClickAway();

    return (
        <>
            <ClickAwayListener onClickAway={onClickClose}>
                <div className={classes.root}>
                    <ActionIconButton onClick={onClickOpen} actionText={"Share"} icon={ShareIcon} />
                    {open && (
                        <div className={classes.dropdown}>
                            <List>
                                <ListItem>
                                    <>{TweetThisIcon}</>
                                    <Typography variant={"body1"} component={"span"}>
                                        Tweet this
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <>{MessagesIcon}</>
                                    <Typography variant={"body1"} component={"span"}>
                                        Send via Direct Message
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <>{LinkIcon}</>
                                    <Typography variant={"body1"} component={"span"}>
                                        Copy link to List
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <>{ShareIcon}</>
                                    <Typography variant={"body1"} component={"span"}>
                                        Share List
                                    </Typography>
                                </ListItem>
                            </List>
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </>
    );
};

export default ShareActionsModal;
