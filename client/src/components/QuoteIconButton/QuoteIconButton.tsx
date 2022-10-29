import React, {FC, memo, ReactElement, useState} from 'react';
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useIconButtonStyles} from "./QuoteIconButtonSyles";
import {QuoteTweetIcon, RetweetIcon, RetweetOutlinedIcon} from "../../icons";
import QuoteTweetModal from "./QuoteTweetModal/QuoteTweetModal";
import {useGlobalStyles} from "../../util/globalClasses";
import {QuoteTweetResponse, TweetResponse} from "../../store/types/tweet";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import {retweet} from "../../store/ducks/tweets/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectUserDataId} from "../../store/ducks/user/selectors";

export interface QuoteTweetProps {
    tweet?: TweetResponse;
}

const QuoteIconButton: FC<QuoteTweetProps> = memo(({tweet}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useIconButtonStyles({isTweetRetweetedByMe: tweet?.isTweetRetweeted});
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const [open, setOpen] = useState<boolean>(false);
    const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const onClickRetweet = (): void => {
        if (tweet?.user.id !== myProfileId) {
            dispatch(retweet(tweet!.id));
        }
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
                    actionText={tweet?.isTweetRetweeted ? "Undo Retweet" : "Retweet"}
                    icon={tweet?.isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
                    onClick={handleClick}
                />
                {(tweet?.retweetsCount !== 0) && (<span id={"retweets"}>{tweet?.retweetsCount}</span>)}
                {open && (
                    <div className={classnames(classes.dropdown, globalClasses.svg)}>
                        <List>
                            <ListItem id={"clickRetweet"} onClick={onClickRetweet}>
                                <>{RetweetOutlinedIcon}</>
                                <Typography variant={"body1"} component={"span"}>
                                    {tweet?.isTweetRetweeted ? ("Undo Retweet") : ("Retweet")}
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
                    quoteTweet={tweet as QuoteTweetResponse}
                    onClose={onCloseAddTweet}
                    visible={visibleAddTweet}
                />
            </div>
        </ClickAwayListener>
    );
});

export default QuoteIconButton;
