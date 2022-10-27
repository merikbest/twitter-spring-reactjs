import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useQuoteTweetStyles} from "./QuoteTweetSyles";
import {QuoteTweetIcon, RetweetIcon, RetweetOutlinedIcon} from "../../icons";
import QuoteTweetModal from "./QuoteTweetModal/QuoteTweetModal";
import {useGlobalStyles} from "../../util/globalClasses";
import {QuoteTweetResponse} from "../../store/types/tweet";
import ActionIconButton from "../ActionIconButton/ActionIconButton";

export interface QuoteTweetProps {
    quoteTweet: QuoteTweetResponse;
    retweetsCount: number;
    isTweetRetweetedByMe: boolean;
    handleRetweet: () => void;
    visibleActionWindow?: boolean;
}

const QuoteTweet: FC<QuoteTweetProps> = (
    {
        quoteTweet,
        retweetsCount,
        isTweetRetweetedByMe,
        handleRetweet,
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
                <ActionIconButton
                    actionText={isTweetRetweetedByMe ? "Undo Retweet" : "Retweet"}
                    icon={isTweetRetweetedByMe ? RetweetIcon : RetweetOutlinedIcon}
                    onClick={handleClick}
                />
                {(retweetsCount !== 0) && (<span id={"retweets"}>{retweetsCount}</span>)}
                {open && (
                    <div className={classnames(classes.dropdown, globalClasses.svg)}>
                        <List>
                            <ListItem id={"clickRetweet"} onClick={onClickRetweet}>
                                <>{RetweetOutlinedIcon}</>
                                <Typography variant={"body1"} component={"span"}>
                                    {isTweetRetweetedByMe ? ("Undo Retweet") : ("Retweet")}
                                </Typography>
                            </ListItem>
                            <ListItem id={"clickOpenAddTweet"} onClick={handleClickOpenAddTweet}>
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
