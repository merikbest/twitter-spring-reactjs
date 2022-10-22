import React, {FC, ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useTweetComponentMoreStyles} from "./TweetComponentActionsStyles";
import {EditIcon, EmbedTweetIcon, ReportIcon} from "../../icons";
import {selectUserDataId} from "../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../util/globalClasses";
import ChangeReplyWindow from "../ChangeReplyWindow/ChangeReplyWindow";
import {TweetResponse} from "../../store/types/tweet";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import TweetActivityButton from "./TweetActivityButton/TweetActivityButton";
import BlockUserButton from "./BlockUserButton/BlockUserButton";
import MuteUserButton from "./MuteUserButton/MuteUserButton";
import AddToListButton from "./AddToListButton/AddToListButton";
import PinTweetButton from "./PinTweetButton/PinTweetButton";
import DeleteTweetButton from "./DeleteTweetButton/DeleteTweetButton";
import FollowUserButton from "./FollowUserButton/FollowUserButton";
import ChangeReplyButton from "./ChangeReplyButton/ChangeReplyButton";

interface TweetComponentActionsProps {
    tweet: TweetResponse;
    isFullTweet: boolean;
    onOpenTweetAnalytics?: () => void;
}

const TweetComponentActions: FC<TweetComponentActionsProps> = ({tweet, isFullTweet}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useTweetComponentMoreStyles({isFullTweet});
    const myProfileId = useSelector(selectUserDataId);
    const [openActionsDropdown, setOpenActionsDropdown] = useState<boolean>(false);
    const [openChangeReplyDropdown, setChangeReplyDropdown] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);

        return () => document.removeEventListener("click", handleClickOutside, true);
    }, []);

    const handleClickOutside = (event: any): void => {
        if (ref.current && !ref.current.contains(event.target)) {
            setChangeReplyDropdown(false);
        }
    };

    const handleClickReplyDropdown = (): void => {
        setChangeReplyDropdown((prev) => !prev);
    };

    const handleClickActionsDropdown = (): void => {
        setOpenActionsDropdown((prev) => !prev);
    };

    const handleClickAwayActionsDropdown = useCallback((): void => {
        setOpenActionsDropdown(false);
    }, []);

    return (
        <div ref={ref}>
            <ClickAwayListener onClickAway={handleClickAwayActionsDropdown}>
                <div className={classes.root}>
                    <ActionIconButton actionText={"More"} onClick={handleClickActionsDropdown} icon={EditIcon}/>
                    {openActionsDropdown && (
                        <div className={classnames(classes.dropdown, globalClasses.svg)}>
                            <List>
                                {(myProfileId === tweet.user.id) ? (
                                    <>
                                        <DeleteTweetButton
                                            tweetId={tweet.id}
                                            addressedTweetId={tweet.addressedTweetId}
                                            onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                        />
                                        <PinTweetButton
                                            tweetId={tweet.id}
                                            onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                        />
                                        <AddToListButton userId={tweet.user.id} username={tweet.user.username}/>
                                        <ChangeReplyButton handleClickReplyDropdown={handleClickReplyDropdown}/>
                                        <ListItem>
                                            <>{EmbedTweetIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                Embed Tweet
                                            </Typography>
                                        </ListItem>
                                        <TweetActivityButton
                                            fullName={tweet.user.fullName}
                                            username={tweet.user.username}
                                            text={tweet.text}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {!tweet.user.isMyProfileBlocked && (
                                            <>
                                                <FollowUserButton
                                                    tweetId={tweet.id}
                                                    userId={tweet.user.id}
                                                    username={tweet.user.username}
                                                    isFollower={tweet.user.isFollower}
                                                />
                                                <AddToListButton
                                                    userId={tweet.user.id}
                                                    username={tweet.user.username}
                                                />
                                            </>
                                        )}
                                        <MuteUserButton
                                            tweetId={tweet.id}
                                            userId={tweet.user.id}
                                            username={tweet.user.username}
                                            isUserMuted={tweet.user.isUserMuted}
                                        />
                                        <BlockUserButton
                                            tweetId={tweet.id}
                                            userId={tweet.user.id}
                                            username={tweet.user.username}
                                            isUserBlocked={tweet.user.isUserBlocked}
                                        />
                                        <ListItem>
                                            <>{EmbedTweetIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                Embed Tweet
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <>{ReportIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                Report Tweet
                                            </Typography>
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </div>
                    )}
                    {openChangeReplyDropdown && (
                        <div className={classes.replyWindowWrapper}>
                            <ChangeReplyWindow
                                tweetId={tweet.id}
                                replyType={tweet.replyType}
                                handleClickReplyDropdown={handleClickReplyDropdown}
                                onCloseActionsDropdown={handleClickAwayActionsDropdown}
                            />
                        </div>
                    )}
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default TweetComponentActions;
