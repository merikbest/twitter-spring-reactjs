import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, List, ListItem, Typography} from "@material-ui/core";

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
    UnblockIcon,
    UnfollowIcon,
    UnmuteIcon
} from "../../icons";
import {selectUserData} from "../../store/ducks/user/selectors";
import {ReplyType, Tweet} from "../../store/ducks/tweets/contracts/state";
import {
    addUserToBlocklist,
    addUserToMuteList,
    fetchPinTweet,
    followUser,
    unfollowUser
} from "../../store/ducks/user/actionCreators";
import TweetComponentActionsModal from "./TweetComponentActionsModal/TweetComponentActionsModal";
import {changeReplyType, fetchDeleteTweet} from "../../store/ducks/tweets/actionCreators";
import TweetComponentChangeReply from "./TweetComponentChangeReply/TweetComponentChangeReply";
import {selectTweetData} from "../../store/ducks/tweet/selectors";
import {deleteTweetReply} from "../../store/ducks/tweet/actionCreators";
import ListsModal from "../ListsModal/ListsModal";
import HoverAction from "../HoverAction/HoverAction";
import BlockUserModal from "../BlockUserModal/BlockUserModal";
import ActionSnackbar from "../ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../hoc/withSnackbar";
import {HoverActions} from "../../hoc/withHoverAction";

interface TweetComponentActionsProps {
    tweet: Tweet;
    isFullTweet: boolean;
    activeTab?: number;
    visibleMoreAction?: boolean;
    handleHoverAction?: (action: HoverActions) => void;
    handleLeaveAction?: () => void;
    onOpenTweetAnalytics: () => void;
}

const TweetComponentActions: FC<TweetComponentActionsProps & SnackbarProps> = (
    {
        tweet,
        isFullTweet,
        activeTab,
        visibleMoreAction,
        handleHoverAction,
        handleLeaveAction,
        onOpenTweetAnalytics,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const classes = useTweetComponentMoreStyles({isFullTweet});
    const dispatch = useDispatch();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const ref = useRef<HTMLDivElement>(null);

    const [openActionsDropdown, setOpenActionsDropdown] = useState<boolean>(false);
    const [openChangeReplyDropdown, setChangeReplyDropdown] = useState<boolean>(false);
    const [visibleTweetPinModal, setVisibleTweetPinModal] = useState<boolean>(false);
    const [visibleListsModal, setVisibleListsModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");

    const follower = myProfile?.followers?.find((follower) => follower.id === tweet.user.id);
    const isUserMuted = myProfile?.userMutedList?.findIndex(mutedUser => mutedUser.id === tweet.user.id) !== -1;
    const isUserBlocked = myProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === tweet.user.id) !== -1;
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
            dispatch(fetchPinTweet(tweet.id));
            setSnackBarMessage!("Your Tweet was unpinned from your profile");
        } else {
            dispatch(fetchPinTweet(tweet.id));
            setSnackBarMessage!("Your Tweet was pinned to your profile.");
        }
        setOpenSnackBar!(true);
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
        setSnackBarMessage!("Your Tweet was deleted");
        setOpenSnackBar!(true);
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
        dispatch(changeReplyType({tweetId: tweet.id, replyType}));

        if (replyType === ReplyType.EVERYONE) {
            setSnackBarMessage!("Everyone can reply now");
        } else if (replyType === ReplyType.FOLLOW) {
            setSnackBarMessage!("People you follow can reply now");
        } else {
            setSnackBarMessage!("Only you can reply now");
        }
        setOpenSnackBar!(true);
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

    const onMuteUser = (): void => {
        dispatch(addUserToMuteList(tweet.user.id!));
        setSnackBarMessage!(`@${tweet.user.username} has been ${isUserMuted ? "unmuted" : "muted"}.`);
        setOpenSnackBar!(true);
    };

    const onBlockUser = (): void => {
        dispatch(addUserToBlocklist(tweet.user.id!));
        setVisibleBlockUserModal(false);
        setSnackBarMessage!(`@${tweet.user.username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
    };

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    return (
        <div ref={ref}>
            <ClickAwayListener onClickAway={handleClickAwayActionsDropdown}>
                <div className={classes.root}>
                    <IconButton
                        onClick={handleClickActionsDropdown}
                        onMouseEnter={() => handleHoverAction?.(HoverActions.MORE)}
                        onMouseLeave={handleLeaveAction}
                    >
                        <span>{EditIcon}</span>
                        <HoverAction visible={visibleMoreAction} actionText={"More"}/>
                    </IconButton>
                    {openActionsDropdown ? (
                        <div className={classes.dropdown}>
                            <List>
                                {(myProfile?.id === tweet.user.id) ? (
                                    <>
                                        <ListItem
                                            id={"delete"}
                                            onClick={() => onOpenTweetComponentActionsModal("Delete")}
                                        >
                                            <>{DeleteIcon}</>
                                            <Typography component={"span"}>
                                                Delete
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={() => onOpenTweetComponentActionsModal("Pin")}>
                                            <>{PinIcon}</>
                                            <Typography component={"span"}>
                                                {(isTweetPinned) ? (
                                                    "Unpin from profile"
                                                ) : (
                                                    "Pin to your profile"
                                                )}
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={onOpenListsModal}>
                                            <>{AddListsIcon}</>
                                            <Typography component={"span"}>
                                                {`Add/remove @${tweet.user.username} from Lists`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={handleClickReplyDropdown}>
                                            <>{ReplyIcon}</>
                                            <Typography component={"span"}>
                                                Change who can reply
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <>{EmbedTweetIcon}</>
                                            <Typography component={"span"}>
                                                Embed Tweet
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={onOpenTweetAnalytics}>
                                            <>{TweetActivityIcon}</>
                                            <Typography component={"span"}>
                                                View Tweet activity
                                            </Typography>
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        <ListItem onClick={handleFollow}>
                                            <>
                                                <>{follower ? UnfollowIcon : FollowIcon}</>
                                                <Typography component={"span"}>
                                                    {follower ? "Unfollow" : "Follow"} @{tweet.user.username}
                                                </Typography>
                                            </>
                                        </ListItem>
                                        <ListItem onClick={onOpenListsModal}>
                                            <>{AddListsIcon}</>
                                            <Typography component={"span"}>
                                                {`Add/remove @${tweet.user.username} from Lists`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={onMuteUser}>
                                            <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
                                            <Typography component={"span"}>
                                                {isUserMuted ? "Unmute" : "Mute"} @{tweet.user.username}
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={onOpenBlockUserModal}>
                                            <>{isUserBlocked ? UnblockIcon : BlockIcon}</>
                                            <Typography component={"span"}>
                                                {isUserBlocked ? "Unblock" : "Block"} @{tweet.user.username}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <>{EmbedTweetIcon}</>
                                            <Typography component={"span"}>
                                                Embed Tweet
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <>{ReportIcon}</>
                                            <Typography component={"span"}>
                                                Report Tweet
                                            </Typography>
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
                    <ActionSnackbar
                        snackBarMessage={snackBarMessage!}
                        openSnackBar={openSnackBar!}
                        onCloseSnackBar={onCloseSnackBar!}
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
            <BlockUserModal
                username={tweet.user.username}
                isUserBlocked={isUserBlocked}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
            <ListsModal user={tweet.user} visible={visibleListsModal} onClose={onCloseListsModal}/>
        </div>
    );
};

export default withSnackbar(TweetComponentActions);
