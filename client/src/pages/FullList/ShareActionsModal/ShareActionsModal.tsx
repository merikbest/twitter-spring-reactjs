import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, IconButton, List, ListItem, Typography} from "@material-ui/core";

import {useShareActionsModalStyles} from "./ShareActionsModalStyles";
import {LinkIcon, MessagesIcon, ShareIcon, TweetThisIcon} from "../../../icons";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../../hoc/withHoverAction";

const ShareActionsModal: FC<HoverActionProps> = (
    {
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
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
                    <IconButton
                        onClick={handleClick}
                        onMouseEnter={() => handleHoverAction?.(HoverActions.SHARE)}
                        onMouseLeave={handleLeaveAction}
                        color="primary"
                    >
                        <>{ShareIcon}</>
                        <HoverAction visible={visibleHoverAction?.visibleShareAction} actionText={"Share"}/>
                    </IconButton>
                    {open ? (
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
                    ) : null}
                </div>
            </ClickAwayListener>
        </>
    );
};

export default withHoverAction(ShareActionsModal);
