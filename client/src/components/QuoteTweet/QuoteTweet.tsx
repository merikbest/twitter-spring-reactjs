import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, IconButton, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useQuoteTweetStyles} from "./QuoteTweetSyles";
import {QuoteTweetIcon, RetweetIcon, RetweetOutlinedIcon} from "../../icons";
import QuoteTweetModal from "./QuoteTweetModal/QuoteTweetModal";
import HoverAction from "../HoverAction/HoverAction";
import {HoverActions} from "../../hoc/withHoverAction";
import {useGlobalStyles} from "../../util/globalClasses";
import {QuoteTweetResponse} from "../../store/types/tweet";

export interface QuoteTweetProps {
    quoteTweet: QuoteTweetResponse;
    retweetsCount: number;
    isTweetRetweetedByMe: boolean;
    handleRetweet: () => void;
    visibleActionWindow?: boolean;
    visibleRetweetAction?: boolean;
    handleHoverAction?: (action: HoverActions) => void;
    handleLeaveAction?: () => void;
}

const QuoteTweet: FC<QuoteTweetProps> = (
    {
        quoteTweet,
        retweetsCount,
        isTweetRetweetedByMe,
        handleRetweet,
        visibleRetweetAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useQuoteTweetStyles({isTweetRetweetedByMe});

    const [open, setOpen] = useState<boolean>(false);
    const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const onClickRetweet = (): void => {
        handleRetweet();
        setOpen(false);
    };

    const handleClickOpenAddTweet = (): void => {
        setVisibleAddTweet(true);
        setOpen(false);
    };

    const onCloseAddTweet = (): void => {
        setVisibleAddTweet(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.footerIcon}>
                <IconButton
                    onClick={handleClick}
                    onMouseEnter={() => handleHoverAction?.(HoverActions.RETWEET)}
                    onMouseLeave={handleLeaveAction}
                    size="small"
                >
                    {isTweetRetweetedByMe ? (
                        <>{RetweetIcon}</>
                    ) : (
                        <>{RetweetOutlinedIcon}</>)
                    }
                    <HoverAction
                        visible={visibleRetweetAction}
                        actionText={isTweetRetweetedByMe ? "Undo Retweet" : "Retweet"}
                    />
                </IconButton>
                {(retweetsCount !== 0) && (<span id={"retweets"}>{retweetsCount}</span>)}
                {open && (
                    <div className={classnames(classes.dropdown, globalClasses.svg)}>
                        <List>
                            <ListItem onClick={onClickRetweet}>
                                <>{RetweetOutlinedIcon}</>
                                <Typography variant={"body1"} component={"span"}>
                                    {isTweetRetweetedByMe ? ("Undo Retweet") : ("Retweet")}
                                </Typography>
                            </ListItem>
                            <ListItem onClick={handleClickOpenAddTweet}>
                                <>{QuoteTweetIcon}</>
                                <Typography variant={"body1"} component={"span"}>
                                    Quote Tweet
                                </Typography>
                            </ListItem>
                        </List>
                    </div>
                )}
                <QuoteTweetModal
                    quoteTweet={quoteTweet}
                    onClose={onCloseAddTweet}
                    visible={visibleAddTweet}
                />
            </div>
        </ClickAwayListener>
    );
};

export default QuoteTweet;
