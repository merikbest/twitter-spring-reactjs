import React, { FC, memo, ReactElement } from "react";
import { ClickAwayListener, List, ListItem, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import classnames from "classnames";

import { useQuoteIconButtonStyles } from "./QuoteIconButtonSyles";
import { QuoteTweetIcon, RetweetIcon, RetweetOutlinedIcon } from "../../icons";
import QuoteTweetModal from "./QuoteTweetModal/QuoteTweetModal";
import { useGlobalStyles } from "../../util/globalClasses";
import { QuoteTweetResponse, UserTweetResponse } from "../../types/tweet";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { retweet } from "../../store/ducks/tweets/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { useModalWindow } from "../../hook/useModalWindow";
import { useClickAway } from "../../hook/useClickAway";

export interface QuoteTweetProps {
    tweetId?: number;
    dateTime?: string;
    text?: string;
    user?: UserTweetResponse;
    isTweetRetweeted?: boolean;
    retweetsCount?: number;
}

const QuoteIconButton: FC<QuoteTweetProps> = memo((
    {
        tweetId,
        dateTime,
        text,
        user,
        isTweetRetweeted,
        retweetsCount
    }
): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useQuoteIconButtonStyles({ isTweetRetweetedByMe: isTweetRetweeted });
    const dispatch = useDispatch();
    const params = useParams<{ userId: string }>();
    const myProfileId = useSelector(selectUserDataId);
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onClickRetweet = (): void => {
        if (user?.id !== myProfileId) {
            dispatch(retweet({ tweetId: tweetId!, userId: params.userId }));
        }
        onClickClose();
    };

    const handleClickOpenAddTweet = (): void => {
        onOpenModalWindow();
        onClickClose();
    };

    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div className={classes.footerIcon}>
                <ActionIconButton
                    actionText={isTweetRetweeted ? "Undo Retweet" : "Retweet"}
                    icon={isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
                    onClick={onClickOpen}
                />
                {(retweetsCount !== 0) && (
                    <span id={"retweets"} className={classes.retweetsCount}>
                        {retweetsCount}
                    </span>
                )}
                {open && (
                    <div className={classnames(classes.dropdown, globalClasses.svg)}>
                        <List>
                            <ListItem id={"clickRetweet"} onClick={onClickRetweet}>
                                <>{RetweetOutlinedIcon}</>
                                <Typography variant={"body1"} component={"span"}>
                                    {isTweetRetweeted ? ("Undo Retweet") : ("Retweet")}
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
                    quoteTweet={{ id: tweetId, dateTime, text, user } as QuoteTweetResponse}
                    onClose={onCloseModalWindow}
                    visible={visibleModalWindow}
                />
            </div>
        </ClickAwayListener>
    );
});

export default QuoteIconButton;
