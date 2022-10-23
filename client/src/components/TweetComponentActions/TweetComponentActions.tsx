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
import {ReplyType} from "../../store/types/common";

interface TweetComponentActionsProps {
    tweetId: number;
    tweetText: string;
    tweetReplyType: ReplyType;
    addressedTweetId: number;
    tweetUserId: number;
    tweetUserFullName: string;
    tweetUserUsername: string;
    tweetUserIsFollower: boolean;
    tweetUserIsUserMuted: boolean;
    tweetUserIsUserBlocked: boolean;
    tweetUserIsMyProfileBlocked: boolean;
    isFullTweet: boolean;
    onOpenTweetAnalytics?: () => void;
}

const TweetComponentActions: FC<TweetComponentActionsProps> = (
    {
        tweetId,
        tweetText,
        tweetReplyType,
        addressedTweetId,
        tweetUserId,
        tweetUserFullName,
        tweetUserUsername,
        tweetUserIsFollower,
        tweetUserIsUserMuted,
        tweetUserIsUserBlocked,
        tweetUserIsMyProfileBlocked,
        isFullTweet
    }
): ReactElement => {
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
                                {(myProfileId === tweetUserId) ? (
                                    <>
                                        <DeleteTweetButton
                                            tweetId={tweetId}
                                            addressedTweetId={addressedTweetId}
                                            onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                        />
                                        <PinTweetButton
                                            tweetId={tweetId}
                                            onCloseActionsDropdown={handleClickAwayActionsDropdown}
                                        />
                                        <AddToListButton userId={tweetUserId} username={tweetUserUsername}/>
                                        <ChangeReplyButton handleClickReplyDropdown={handleClickReplyDropdown}/>
                                        <ListItem>
                                            <>{EmbedTweetIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                Embed Tweet
                                            </Typography>
                                        </ListItem>
                                        <TweetActivityButton
                                            fullName={tweetUserFullName}
                                            username={tweetUserUsername}
                                            text={tweetText}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {!tweetUserIsMyProfileBlocked && (
                                            <>
                                                <FollowUserButton
                                                    tweetId={tweetId}
                                                    userId={tweetUserId}
                                                    username={tweetUserUsername}
                                                    isFollower={tweetUserIsFollower}
                                                />
                                                <AddToListButton
                                                    userId={tweetUserId}
                                                    username={tweetUserUsername}
                                                />
                                            </>
                                        )}
                                        <MuteUserButton
                                            tweetId={tweetId}
                                            userId={tweetUserId}
                                            username={tweetUserUsername}
                                            isUserMuted={tweetUserIsUserMuted}
                                        />
                                        <BlockUserButton
                                            tweetId={tweetId}
                                            userId={tweetUserId}
                                            username={tweetUserUsername}
                                            isUserBlocked={tweetUserIsUserBlocked}
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
                                tweetId={tweetId}
                                replyType={tweetReplyType}
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
