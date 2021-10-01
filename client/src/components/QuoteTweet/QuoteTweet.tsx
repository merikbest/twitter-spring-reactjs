import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, IconButton, List, ListItem} from "@material-ui/core";

import {useQuoteTweetStyles} from "./QuoteTweetSyles";
import {Retweet, Tweet} from "../../store/ducks/tweets/contracts/state";
import {QuoteTweetIcon, RetweetIcon, RetweetOutlinedIcon} from "../../icons";
import QuoteTweetModal from "./QuoteTweetModal/QuoteTweetModal";
import HoverAction from "../HoverAction/HoverAction";
import {TweetActions} from "../TweetComponent/TweetComponent";

export interface QuoteTweetProps {
    quoteTweet: Tweet;
    retweets: Retweet[];
    isTweetRetweetedByMe: Retweet | undefined;
    handleRetweet: () => void;
    visibleActionWindow?: boolean;
    visibleRetweetAction?: boolean;
    handleHoverAction?: (action: TweetActions) => void;
    handleLeaveAction?: () => void;
}

const QuoteTweet: FC<QuoteTweetProps> = (
    {
        quoteTweet,
        retweets,
        isTweetRetweetedByMe,
        handleRetweet,
        visibleRetweetAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
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
                    onMouseEnter={() => handleHoverAction?.(TweetActions.RETWEET)}
                    onMouseLeave={handleLeaveAction}
                >
                    {isTweetRetweetedByMe ? (
                        <>{RetweetIcon}</>
                    ) : (
                        <>{RetweetOutlinedIcon}</>)
                    }
                    {visibleRetweetAction && <HoverAction actionText={isTweetRetweetedByMe ? "Undo Retweet" : "Retweet"}/>}
                </IconButton>
                {(retweets.length === 0 || retweets === null) ? null : (
                    isTweetRetweetedByMe ? (
                        <span id={"retweets"}>{retweets.length}</span>
                    ) : (
                        <span id={"retweets"}>{retweets.length}</span>)
                )}
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            <ListItem onClick={onClickRetweet}>
                                <span className={classes.textIcon}>{RetweetOutlinedIcon}</span>
                                <span className={classes.text}>
                                    {isTweetRetweetedByMe ? ("Undo Retweet") : ("Retweet")}
                                </span>
                            </ListItem>
                            <ListItem onClick={handleClickOpenAddTweet}>
                                <span className={classes.textIcon}>{QuoteTweetIcon}</span>
                                <span className={classes.text}>Quote Tweet</span>
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
