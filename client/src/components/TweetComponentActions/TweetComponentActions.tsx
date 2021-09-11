import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, List, ListItem} from "@material-ui/core";

import {useTweetComponentMoreStyles} from "./TweetComponentActionsStyles";
import {
    AddListsIcon,
    BlockIcon,
    DeleteIcon,
    EditIcon,
    EmbedTweetIcon,
    FollowIcon,
    MuteIcon,
    PinIcon,
    ReplyIcon,
    ReportIcon,
    TweetActivityIcon,
    UnfollowIcon
} from "../../icons";
import {selectUserData} from "../../store/ducks/user/selectors";
import {ReplyType, Tweet} from "../../store/ducks/tweets/contracts/state";
import {fetchPinTweet, fetchUnpinTweet, followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import TweetComponentActionsModal from "./TweetComponentActionsModal/TweetComponentActionsModal";
import {fetchChangeReplyType, fetchDeleteTweet} from "../../store/ducks/tweets/actionCreators";
import TweetComponentChangeReply from "./TweetComponentChangeReply/TweetComponentChangeReply";
import {selectTweetData} from "../../store/ducks/tweet/selectors";
import {deleteTweetReply} from "../../store/ducks/tweet/actionCreators";
import ListsModal from "./ListsModal/ListsModal";

interface TweetComponentActionsProps {
    tweet: Tweet;
    isFullTweet: boolean;
    activeTab?: number;
}

const TweetComponentActions: FC<TweetComponentActionsProps> = ({tweet, isFullTweet, activeTab}): ReactElement => {
    const classes = useTweetComponentMoreStyles({isFullTweet});
    const dispatch = useDispatch();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const ref = useRef<HTMLDivElement>(null);

    const [openActionsDropdown, setOpenActionsDropdown] = useState<boolean>(false);
    const [openChangeReplyDropdown, setChangeReplyDropdown] = useState<boolean>(false);
    const [visibleTweetPinModal, setVisibleTweetPinModal] = useState<boolean>(false);
    const [visibleListsModal, setVisibleListsModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");

    const follower = myProfile?.followers?.find((follower) => follower.id === tweet.user.id);
    const isTweetPinned = myProfile?.pinnedTweet?.id === tweet.id;

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    const handleClickOutside = (event: any): void => {
        if (ref.current && !ref.current.contains(event.target)) {
            setChangeReplyDropdown(false);
        }
    };

    const handleClickReplyDropdown = (): void => {
        setChangeReplyDropdown(true);
    };

    const handleClickActionsDropdown = (): void => {
        setOpenActionsDropdown((prev) => !prev);
    };

    const handleClickAwayActionsDropdown = (): void => {
        setOpenActionsDropdown(false);
    };

    const onPinUserTweet = (): void => {
        if (isTweetPinned) {
            dispatch(fetchUnpinTweet(tweet.id));
        } else {
            dispatch(fetchPinTweet(tweet.id));
        }
        setOpenActionsDropdown(false);
        setVisibleTweetPinModal(false);
    };

    const onDeleteUserTweet = (): void => {
        const isTweetReply = tweetData?.replies.find((reply) => reply.id === tweet.id);

        if (isTweetReply) {
            dispatch(deleteTweetReply(tweet.id));
        } else {
            dispatch(fetchDeleteTweet(tweet.id));
        }
        setOpenActionsDropdown(false);
        setVisibleTweetPinModal(false);
    };

    const handleFollow = (): void => {
        if (follower) {
            dispatch(unfollowUser(tweet.user!));
        } else {
            dispatch(followUser(tweet.user!));
        }
    };

    const onChangeTweetReplyType = (replyType: ReplyType): void => {
        dispatch(fetchChangeReplyType({tweetId: tweet.id, replyType}))
        setChangeReplyDropdown(false);
        setOpenActionsDropdown(false);
    };

    const onOpenTweetComponentActionsModal = (title: string): void => {
        setModalTitle(title);
        setVisibleTweetPinModal(true);
    };

    const onCloseTweetComponentActionsModal = (): void => {
        setVisibleTweetPinModal(false);
    };

    const onOpenListsModal = (): void => {
        setVisibleListsModal(true);
    };

    const onCloseListsModal = (): void => {
        setVisibleListsModal(false);
    };

    return (
        <div ref={ref}>
            <ClickAwayListener onClickAway={handleClickAwayActionsDropdown}>
                <div className={classes.root}>
                    <IconButton onClick={handleClickActionsDropdown}>
                        <span>{EditIcon}</span>
                    </IconButton>
                    {openActionsDropdown ? (
                        <div className={classes.dropdown}>
                            <List>
                                {(myProfile?.id === tweet.user.id) ? (
                                    <>
                                        <ListItem
                                            className={classes.delete}
                                            onClick={() => onOpenTweetComponentActionsModal("Delete")}
                                        >
                                            <span>{DeleteIcon}</span>
                                            <span className={classes.text}>
                                                Delete
                                            </span>
                                        </ListItem>
                                        <ListItem onClick={() => onOpenTweetComponentActionsModal("Pin")}>
                                            <span className={classes.textIcon}>{PinIcon}</span>
                                            <span className={classes.text}>
                                                {(isTweetPinned) ? (
                                                    "Unpin from profile"
                                                ) : (
                                                    "Pin to your profile"
                                                )}
                                            </span>
                                        </ListItem>
                                        <ListItem onClick={onOpenListsModal}>
                                            <span className={classes.textIcon}>{AddListsIcon}</span>
                                            <span className={classes.text}>
                                                {`Add/remove @${tweet.user.username} from Lists`}
                                            </span>
                                        </ListItem>
                                        <ListItem onClick={handleClickReplyDropdown}>
                                            <span className={classes.textIcon}>{ReplyIcon}</span>
                                            <span className={classes.text}>
                                                Change who can reply
                                            </span>
                                        </ListItem>
                                        <ListItem>
                                            <span className={classes.textIcon}>{EmbedTweetIcon}</span>
                                            <span className={classes.text}>
                                                Embed Tweet
                                            </span>
                                        </ListItem>
                                        <ListItem>
                                            <span className={classes.textIcon}>{TweetActivityIcon}</span>
                                            <span className={classes.text}>
                                                View Tweet activity
                                            </span>
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        <ListItem onClick={handleFollow}>
                                            {follower ? (
                                                <>
                                                    <span className={classes.textIcon}>{UnfollowIcon}</span>
                                                    <span className={classes.text}>
                                                        {`Unfollow @${tweet.user.username}`}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className={classes.textIcon}>{FollowIcon}</span>
                                                    <span className={classes.text}>
                                                        {`Follow @${tweet.user.username}`}
                                                    </span>
                                                </>
                                            )}
                                        </ListItem>
                                        <ListItem>
                                            <span className={classes.textIcon}>{AddListsIcon}</span>
                                            <span
                                                className={classes.text}>
                                                {`Add/remove @${tweet.user.username} from Lists`}
                                            </span>
                                        </ListItem>
                                        <ListItem>
                                            <span className={classes.textIcon}>{MuteIcon}</span>
                                            <span className={classes.text}>
                                                {`Mute @${tweet.user.username}`}
                                            </span>
                                        </ListItem>
                                        <ListItem>
                                            <span className={classes.textIcon}>{BlockIcon}</span>
                                            <span className={classes.text}>
                                                {`Block @${tweet.user.username}`}
                                            </span>
                                        </ListItem>
                                        <ListItem>
                                            <span className={classes.textIcon}>{EmbedTweetIcon}</span>
                                            <span className={classes.text}>
                                                Embed Tweet
                                            </span>
                                        </ListItem>
                                        <ListItem>
                                            <span className={classes.textIcon}>{ReportIcon}</span>
                                            <span className={classes.text}>
                                                Report Tweet
                                            </span>
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </div>
                    ) : null}
                    <TweetComponentChangeReply
                        replyType={tweet.replyType}
                        openChangeReplyDropdown={openChangeReplyDropdown}
                        onChangeTweetReplyType={onChangeTweetReplyType}
                    />
                </div>
            </ClickAwayListener>
            <TweetComponentActionsModal
                modalTitle={modalTitle}
                isTweetPinned={isTweetPinned}
                visibleTweetComponentActionsModal={visibleTweetPinModal}
                onCloseTweetComponentActionsModal={onCloseTweetComponentActionsModal}
                onPinUserTweet={onPinUserTweet}
                onDeleteUserTweet={onDeleteUserTweet}
            />
            {visibleListsModal && <ListsModal tweetId={tweet.id} visible={visibleListsModal} onClose={onCloseListsModal}/>}
        </div>
    );
};

export default TweetComponentActions;
