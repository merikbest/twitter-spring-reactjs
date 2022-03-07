import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

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
import {ReplyType} from "../../store/ducks/tweets/contracts/state";
import {
    fetchPinTweet,
    followUser,
    processUserToBlocklist,
    processUserToMuteList,
    unfollowUser
} from "../../store/ducks/user/actionCreators";
import TweetComponentActionsModal from "./TweetComponentActionsModal/TweetComponentActionsModal";
import {changeReplyType, fetchDeleteTweet} from "../../store/ducks/tweets/actionCreators";
import {deleteTweetReply} from "../../store/ducks/tweet/actionCreators";
import HoverAction from "../HoverAction/HoverAction";
import BlockUserModal from "../BlockUserModal/BlockUserModal";
import ActionSnackbar from "../ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../hoc/withSnackbar";
import {HoverActions} from "../../hoc/withHoverAction";
import {useGlobalStyles} from "../../util/globalClasses";
import ChangeReplyWindow from "../ChangeReplyWindow/ChangeReplyWindow";
import {TweetResponse} from "../../store/types/tweet";
import ListsModal from "../ListsModal/ListsModal";

interface TweetComponentActionsProps {
    tweet: TweetResponse;
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
    const globalClasses = useGlobalStyles();
    const classes = useTweetComponentMoreStyles({isFullTweet});
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const ref = useRef<HTMLDivElement>(null);

    const [openActionsDropdown, setOpenActionsDropdown] = useState<boolean>(false);
    const [openChangeReplyDropdown, setChangeReplyDropdown] = useState<boolean>(false);
    const [visibleTweetPinModal, setVisibleTweetPinModal] = useState<boolean>(false);
    const [visibleListsModal, setVisibleListsModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const isTweetPinned = myProfile?.pinnedTweetId === tweet.id;

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
        if (tweet.addressedTweetId !== null) {
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
        if (tweet.user.isFollower) {
            dispatch(unfollowUser({userId: tweet.user?.id!, tweetId: tweet.id}));
        } else {
            dispatch(followUser({userId: tweet.user?.id!, tweetId: tweet.id}));
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
        dispatch(processUserToMuteList({userId: tweet.user?.id!, tweetId: tweet.id}));
        setSnackBarMessage!(`@${tweet.user.username} has been ${tweet.user.isUserMuted ? "unmuted" : "muted"}.`);
        setOpenSnackBar!(true);
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: tweet.user?.id!, tweetId: tweet.id}));
        setVisibleBlockUserModal(false);
        setSnackBarMessage!(`@${tweet.user.username} has been ${tweet.user.isUserBlocked ? "unblocked" : "blocked"}.`);
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
                        size={"small"}
                    >
                        <>{EditIcon}</>
                        <HoverAction visible={visibleMoreAction} actionText={"More"}/>
                    </IconButton>
                    {openActionsDropdown ? (
                        <div className={classnames(classes.dropdown, globalClasses.svg)}>
                            <List>
                                {(myProfile?.id === tweet.user.id) ? (
                                    <>
                                        <ListItem
                                            id={"delete"}
                                            onClick={() => onOpenTweetComponentActionsModal("Delete")}
                                        >
                                            <>{DeleteIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                Delete
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={() => onOpenTweetComponentActionsModal("Pin")}>
                                            <>{PinIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                {(isTweetPinned) ? (
                                                    "Unpin from profile"
                                                ) : (
                                                    "Pin to your profile"
                                                )}
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={onOpenListsModal}>
                                            <>{AddListsIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                {`Add/remove @${tweet.user.username} from Lists`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={handleClickReplyDropdown}>
                                            <>{ReplyIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                Change who can reply
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <>{EmbedTweetIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                Embed Tweet
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={onOpenTweetAnalytics}>
                                            <>{TweetActivityIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                View Tweet activity
                                            </Typography>
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        {tweet.user.isMyProfileBlocked ? null : (
                                            <>
                                                <ListItem onClick={handleFollow}>
                                                    <>
                                                        <>{tweet.user.isFollower ? UnfollowIcon : FollowIcon}</>
                                                        <Typography variant={"body1"} component={"span"}>
                                                            {tweet.user.isFollower ? "Unfollow" : "Follow"} @{tweet.user.username}
                                                        </Typography>
                                                    </>
                                                </ListItem>
                                                <ListItem onClick={onOpenListsModal}>
                                                    <>{AddListsIcon}</>
                                                    <Typography variant={"body1"} component={"span"}>
                                                        {`Add/remove @${tweet.user.username} from Lists`}
                                                    </Typography>
                                                </ListItem>
                                            </>
                                        )}
                                        <ListItem onClick={onMuteUser}>
                                            <>{tweet.user.isUserMuted ? UnmuteIcon : MuteIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                {tweet.user.isUserMuted ? "Unmute" : "Mute"} @{tweet.user.username}
                                            </Typography>
                                        </ListItem>
                                        <ListItem onClick={onOpenBlockUserModal}>
                                            <>{tweet.user.isUserBlocked ? UnblockIcon : BlockIcon}</>
                                            <Typography variant={"body1"} component={"span"}>
                                                {tweet.user.isUserBlocked ? "Unblock" : "Block"} @{tweet.user.username}
                                            </Typography>
                                        </ListItem>
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
                    ) : null}
                    {openChangeReplyDropdown && (
                        <div className={classes.replyWindowWrapper}>
                            <ChangeReplyWindow
                                replyType={tweet.replyType}
                                onChangeTweetReplyType={onChangeTweetReplyType}
                            />
                        </div>
                    )}
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
                isUserBlocked={tweet.user.isUserBlocked}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
            <ListsModal user={tweet.user} visible={visibleListsModal} onClose={onCloseListsModal}/>
        </div>
    );
};

export default withSnackbar(TweetComponentActions);
