import React, {ChangeEvent, ComponentType, FC, ReactElement, ReactNode, useEffect, useState} from 'react';
import {Link, useHistory, useLocation, useParams, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, Divider, IconButton, Link as MuiLink, List, ListItem, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';
import format from 'date-fns/format';
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import classNames from "classnames";
import {compose} from "recompose";

import {
    CalendarIcon,
    LinkIcon,
    LocationIcon,
    LockIcon,
    MessagesIcon,
    NotificationsAddFilledIcon,
    NotificationsAddIcon
} from "../../icons";
import {useUserPageStyles} from "./UserPageStyles";
import BackButton from "../../components/BackButton/BackButton";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import {
    addUserToBlocklist,
    addUserToMuteList,
    fetchUserData,
    follow,
    unfollow
} from "../../store/ducks/user/actionCreators";
import {selectUserData, selectUserIsLoaded} from "../../store/ducks/user/selectors";
import {
    selectIsUserTweetsLoaded,
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "../../store/ducks/userTweets/selectors";
import {
    deleteUserTweet,
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserRetweetsAndReplies,
    fetchUserTweets,
    resetUserTweets,
    setAddedUserTweet,
    setUpdatedUserTweet
} from "../../store/ducks/userTweets/actionCreators";
import {
    selectUserProfile,
    selectUsersIsErrorLoaded, selectUsersIsLoading,
    selectUsersIsSuccessLoaded
} from "../../store/ducks/userProfile/selectors";
import {
    fetchUserProfile,
    followUserProfile,
    processFollowRequest,
    processSubscribe,
    resetUserProfile, resetUserProfileStateAction,
    unfollowUserProfile
} from "../../store/ducks/userProfile/actionCreators";
import UserPageTweets from "./UserPageTweets";
import {DEFAULT_PROFILE_IMG, WS_URL} from "../../util/url";
import SetupProfileModal from "../SetupProfileModal/SetupProfileModal";
import UserPageActions from "./UserPageActions/UserPageActions";
import {createChat} from "../../store/ducks/chats/actionCreators";
import BlockUserModal from "../../components/BlockUserModal/BlockUserModal";
import ActionSnackbar from "../../components/ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../hoc/withSnackbar";
import Spinner from "../../components/Spinner/Spinner";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";
import HoverAction from "../../components/HoverAction/HoverAction";
import {User} from "../../store/ducks/user/contracts/state";
import FollowerGroup from "../../components/FollowerGroup/FollowerGroup";
import UserNotFound from "./UserNotFound/UserNotFound";
import {useGlobalStyles} from "../../util/globalClasses";
import classnames from "classnames";

interface LinkToFollowersProps {
    children: ReactNode;
    linkTo: string;
}

let stompClient: CompatClient | null = null;

const UserPage: FC<SnackbarProps & HoverActionProps> = (
    {
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const tweets = useSelector(selectUserTweetsItems);
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const isMyProfileLoaded = useSelector(selectUserIsLoaded);
    const isUserProfileLoading = useSelector(selectUsersIsLoading);
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const isUserProfileNotLoaded = useSelector(selectUsersIsErrorLoaded);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const isTweetsLoaded = useSelector(selectIsUserTweetsLoaded);
    const location = useLocation<{ isRegistered: boolean; }>();
    const history = useHistory();
    const params = useParams<{ id: string }>();

    const [btnText, setBtnText] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [sameFollowers, setSameFollowers] = useState<User[]>([]);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);
    const [visibleSetupProfile, setVisibleSetupProfile] = useState<boolean>(false);
    const pagesCount = useSelector(selectPagesCount);
    const [page, setPage] = useState<number>(0);

    const isSubscriber = userProfile?.subscribers?.findIndex(subscriber => subscriber.id === myProfile?.id) !== -1;
    const isFollower = myProfile?.followers?.findIndex(follower => follower.id === userProfile?.id) !== -1;
    const isUserMuted = myProfile?.userMutedList?.findIndex(mutedUser => mutedUser.id === userProfile?.id) !== -1;
    const isUserBlocked = myProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === userProfile?.id) !== -1;
    const isMyProfileBlocked = userProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;
    const isWaitingForApprove = userProfile?.followerRequests?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;

    useEffect(() => {
        window.scrollTo(0, 0);

        if (params.id) {
            dispatch(fetchUserProfile(params.id));
        }
        document.body.style.overflow = 'unset';

        stompClient = Stomp.over(new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/user/add/tweet/" + params.id, (response) => {
                dispatch(setAddedUserTweet(JSON.parse(response.body)));
            });
            stompClient?.subscribe("/topic/user/update/tweet/" + params.id, (response) => {
                if (JSON.parse(response.body).tweetDeleted) {
                    dispatch(deleteUserTweet(JSON.parse(response.body)));
                } else {
                    dispatch(setUpdatedUserTweet(JSON.parse(response.body)));
                }
            });
        });

        return () => {
            dispatch(resetUserProfileStateAction());
            dispatch(resetUserTweets());
            stompClient?.disconnect();
        };
    }, [params.id]);

    useEffect(() => {
        setBtnText(isWaitingForApprove ? ("Pending") : (isUserBlocked ? "Blocked" : "Following"));

        if (userProfile) {
            dispatch(fetchUserTweets({userId: params.id, page: 0}));
            setPage(prevState => prevState + 1);
        }

        if (location.state?.isRegistered) {
            setVisibleSetupProfile(true);
        }
        return () => {
            dispatch(resetUserTweets());
        };
    }, [userProfile]);

    useEffect(() => {
        const isBlocked = myProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === userProfile?.id) !== -1;
        setBtnText(isWaitingForApprove ? ("Pending") : (isBlocked ? "Blocked" : "Following"));
    }, [myProfile]);

    useEffect(() => {
        if (isMyProfileLoaded && isUserProfileSuccessLoaded) {
            const followers = myProfile?.followers?.filter(({id: id1}) => userProfile?.followers?.some(({id: id2}) => id2 === id1));
            setSameFollowers(followers!);
        }
    }, [isMyProfileLoaded && isUserProfileSuccessLoaded]);

    const loadUserTweets = (): void => {
        if (activeTab === 1) {
            dispatch(fetchUserRetweetsAndReplies({userId: params.id, page: page}));
        } else if (activeTab === 2) {
            dispatch(fetchUserMediaTweets({userId: params.id, page: page}));
        } else if (activeTab === 3) {
            dispatch(fetchUserLikedTweets({userId: params.id, page: page}));
        } else {
            dispatch(fetchUserTweets({userId: params.id, page: page}));
        }

        if (isTweetsLoaded) {
            setPage(prevState => prevState + 1);
        }
    };

    const showTweetCount = (): string => {
        if (userProfile !== undefined) {
            if (activeTab === 2) {
                return `${userProfile.mediaTweetCount} ${(userProfile.mediaTweetCount === 1) ? "Photo & video" : "Photos & videos"}`;
            } else if (activeTab === 3) {
                return `${userProfile.likeCount} ${(userProfile.likeCount === 1) ? "Like" : "Likes"}`;
            } else {
                return `${userProfile.tweetCount} ${(userProfile.tweetCount === 1) ? "Tweet" : "Tweets"}`;
            }
        }
        return "";
    };

    const handleShowTweets = (callback: () => void): void => {
        window.scrollTo(0, 0);
        setPage(0);
        dispatch(resetUserTweets());
        callback();
    };

    const handleChange = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const onOpenEditProfile = (): void => {
        setVisibleEditProfile(true);
    };

    const onCloseEditProfile = (): void => {
        setVisibleEditProfile(false);
    };

    const onOpenSetupProfile = (): void => {
        setVisibleSetupProfile(true);
    };

    const onCloseSetupProfile = (): void => {
        setVisibleSetupProfile(false);
    };

    const LinkToFollowers = ({children, linkTo}: LinkToFollowersProps): JSX.Element => {
        if (userProfile?.privateProfile && linkTo && userProfile?.id !== myProfile?.id) {
            return <div className={classes.followLink}>{children}</div>;
        } else {
            return <Link to={`/user/${userProfile?.id}/${linkTo}`} className={classes.followLink}>{children}</Link>
        }
    };

    const handleFollow = (): void => {
        if (userProfile?.privateProfile) {
            dispatch(processFollowRequest(userProfile.id!));
        } else {
            if (isFollower) {
                // dispatch(unfollowUserProfile(userProfile!));
                // dispatch(unfollow(userProfile!.id));
            } else {
                // dispatch(followUserProfile(userProfile!));
                // dispatch(follow(userProfile!.id));
            }
        }
    };

    const handleShowUserTweets = (): void => {
        dispatch(fetchUserTweets({userId: params.id, page: 0}));
        setPage(prevState => prevState + 1);
    };

    const handleShowUserRetweetsAndReplies = (): void => {
        dispatch(fetchUserRetweetsAndReplies({userId: params.id, page: 0}));
        setPage(prevState => prevState + 1);
    };

    const handleShowMediaTweets = (): void => {
        dispatch(fetchUserMediaTweets({userId: params.id, page: 0}));
        setPage(prevState => prevState + 1);
    };

    const handleShowLikedTweets = (): void => {
        dispatch(fetchUserLikedTweets({userId: params.id, page: 0}));
        setPage(prevState => prevState + 1);
    };

    const handleClickAddUserToChat = (): void => {
        dispatch(createChat(userProfile?.id!));
        history.push("/messages");
    };

    const onMuteUser = (): void => {
        dispatch(addUserToMuteList(userProfile?.id!));
        setSnackBarMessage!(`@${userProfile?.username} has been ${isUserMuted ? "unmuted" : "muted"}.`);
        setOpenSnackBar!(true);
    };

    const onBlockUser = (): void => {
        dispatch(addUserToBlocklist(userProfile?.id!));
        setVisibleBlockUserModal(false);
        setBtnText(isUserBlocked ? "Following" : "Blocked");
        setSnackBarMessage!(`@${userProfile?.username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
    };

    const handleSubscribeToNotifications = (): void => {
        dispatch(processSubscribe(userProfile?.id!));
    };

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    return (
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadUserTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            {isUserProfileNotLoaded ? (
                <UserNotFound/>
            ) : (
                <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
                    <Paper className={globalClasses.pageHeader} variant="outlined">
                        <BackButton/>
                        <div>
                            <Typography variant={"h5"} component={"span"}>
                                {userProfile?.fullName}
                            </Typography>
                            {userProfile?.privateProfile && (
                                <span className={classes.lockIcon}>
                                    {LockIcon}
                                </span>
                            )}
                            <Typography variant={"subtitle2"} component={"div"}>
                                {showTweetCount()}
                            </Typography>
                        </div>
                    </Paper>
                    <div className={globalClasses.contentWrapper}>
                        <div className={classes.wallpaper}>
                            {userProfile?.wallpaper?.src && (
                                <img
                                    key={userProfile?.wallpaper?.src}
                                    src={userProfile?.wallpaper?.src}
                                    alt={userProfile?.wallpaper?.src}
                                />
                            )}
                        </div>
                        <div className={classes.info}>
                            <div style={{display: "inline-block"}}>
                                <Avatar src={userProfile !== undefined ? userProfile?.avatar?.src ? userProfile?.avatar.src : DEFAULT_PROFILE_IMG : undefined}>
                                    <div></div>
                                </Avatar>
                            </div>
                            {(isMyProfileLoaded && isUserProfileSuccessLoaded) && (
                                isMyProfileBlocked ? null : (
                                    (userProfile?.id === myProfile?.id) ? (
                                        <Button
                                            className={classes.outlinedButton}
                                            onClick={myProfile?.profileCustomized ? onOpenEditProfile : onOpenSetupProfile}
                                            color="primary"
                                            variant="outlined"
                                            size="large"
                                        >
                                            {myProfile?.profileCustomized ? "Edit profile" : "Setup profile"}
                                        </Button>
                                    ) : (
                                        <div className={classes.buttonWrapper}>
                                            <UserPageActions
                                                user={userProfile!}
                                                isUserMuted={isUserMuted}
                                                isUserBlocked={isUserBlocked}
                                                onMuteUser={onMuteUser}
                                                onOpenBlockUserModal={onOpenBlockUserModal}
                                                visibleMoreAction={visibleHoverAction?.visibleMoreAction}
                                                handleHoverAction={handleHoverAction}
                                                handleLeaveAction={handleLeaveAction}
                                            />
                                            {!isUserBlocked && (
                                                !userProfile?.mutedDirectMessages || isFollower ? (
                                                    <IconButton
                                                        className={globalClasses.userPageIconButton}
                                                        onClick={handleClickAddUserToChat}
                                                        onMouseEnter={() => handleHoverAction?.(HoverActions.MESSAGE)}
                                                        onMouseLeave={handleLeaveAction}
                                                        color="primary"
                                                    >
                                                        {MessagesIcon}
                                                        <HoverAction
                                                            visible={visibleHoverAction?.visibleMessageAction}
                                                            actionText={"Message"}
                                                        />
                                                    </IconButton>
                                                ) : null
                                            )}
                                            {isUserBlocked ? (
                                                <Button
                                                    className={classNames(classes.primaryButton, classes.blockButton)}
                                                    onClick={onOpenBlockUserModal}
                                                    onMouseOver={() => setBtnText("Unblock")}
                                                    onMouseLeave={() => setBtnText("Blocked")}
                                                    color="primary"
                                                    variant="contained"
                                                    size="large"
                                                >
                                                    {btnText}
                                                </Button>
                                            ) : (
                                                isFollower ? (
                                                    <>
                                                        <IconButton
                                                            onClick={handleSubscribeToNotifications}
                                                            onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                                                            onMouseLeave={handleLeaveAction}
                                                            className={globalClasses.userPageIconButton}
                                                            color="primary"
                                                        >
                                                            {isSubscriber ? NotificationsAddFilledIcon : NotificationsAddIcon}
                                                            <HoverAction
                                                                visible={visibleHoverAction?.visibleOtherAction}
                                                                actionText={isSubscriber ? "Turn off notifications" : "Notify"}
                                                            />
                                                        </IconButton>
                                                        <Button
                                                            className={classes.primaryButton}
                                                            onClick={handleFollow}
                                                            onMouseOver={() => setBtnText("Unfollow")}
                                                            onMouseLeave={() => setBtnText("Following")}
                                                            color="primary"
                                                            variant="contained"
                                                            size="large"
                                                        >
                                                            {btnText}
                                                        </Button>
                                                    </>
                                                ) : ((userProfile !== undefined) ? (
                                                        isWaitingForApprove ? (
                                                            <Button
                                                                className={classes.outlinedButton}
                                                                onClick={handleFollow}
                                                                onMouseOver={() => setBtnText("Cancel")}
                                                                onMouseLeave={() => setBtnText("Pending")}
                                                                color="primary"
                                                                variant="outlined"
                                                                size="large"
                                                            >
                                                                {btnText}
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={handleFollow}
                                                                className={classes.outlinedButton}
                                                                color="primary"
                                                                variant="outlined"
                                                                size="large"
                                                            >
                                                                Follow
                                                            </Button>
                                                        )
                                                    ) : null
                                                )
                                            )}
                                        </div>
                                    )
                                )
                            )}
                            {(userProfile === undefined) ? (
                                <Skeleton variant="text" width={250} height={30}/>
                            ) : (
                                <div>
                                    <Typography variant={"h5"} component={"span"}>
                                        {userProfile.fullName}
                                    </Typography>
                                    {userProfile?.privateProfile && (
                                        <span className={classes.lockIcon}>
                                            {LockIcon}
                                        </span>
                                    )}
                                </div>
                            )}
                            {(userProfile === undefined) ? (
                                <Skeleton variant="text" width={60}/>
                            ) : (
                                <Typography variant={"subtitle1"} component={"div"}>
                                    @{userProfile.username}
                                </Typography>
                            )}
                            {isMyProfileBlocked ? null : (
                                <Typography variant={"body1"} component={"div"} className={classes.description}>
                                    {userProfile?.about}
                                </Typography>
                            )}
                            <div className={classes.infoList}>
                                {(userProfile === undefined) && (
                                    <div className={classes.skeletonDetails}>
                                        <Skeleton component={"span"} variant="text" width={80}/>
                                        <Skeleton component={"span"} variant="text" width={150}/>
                                        <Skeleton component={"span"} variant="text" width={150}/>
                                    </div>
                                )}
                                {isMyProfileBlocked ? null : (
                                    <List>
                                        {userProfile?.location && (
                                            <ListItem>
                                                <>{LocationIcon}</>
                                                <Typography variant={"subtitle1"} component={"span"}>
                                                    {userProfile?.location}
                                                </Typography>
                                            </ListItem>
                                        )}
                                        {userProfile?.website && (
                                            <ListItem>
                                                <>{LinkIcon}</>
                                                <MuiLink
                                                    href={userProfile?.website}
                                                    variant="subtitle1"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    {userProfile?.website}
                                                </MuiLink>
                                            </ListItem>
                                        )}
                                        {userProfile?.dateOfBirth && (
                                            <ListItem>
                                                <Typography variant={"subtitle1"} component={"span"}>
                                                    Date of Birth: {userProfile?.dateOfBirth}
                                                </Typography>
                                            </ListItem>
                                        )}
                                        {userProfile?.registrationDate && (
                                            <ListItem>
                                                <>{CalendarIcon}</>
                                                <Typography variant={"subtitle1"} component={"span"}>
                                                    Joined: {format(new Date(userProfile?.registrationDate), 'MMMM yyyy')}
                                                </Typography>
                                            </ListItem>
                                        )}
                                    </List>
                                )}
                                {(userProfile === undefined) && (
                                    <div className={classes.skeletonDetails}>
                                        <Skeleton component={"span"} variant="text" width={80}/>
                                        <Skeleton component={"span"} variant="text" width={80}/>
                                    </div>
                                )}
                                {isMyProfileBlocked ? null : (
                                    <List className={classes.details}>
                                        <LinkToFollowers linkTo={"following"}>
                                            <ListItem>
                                                <Typography variant={"h6"} component={"span"}>
                                                    {(userProfile?.id === myProfile?.id) ? (
                                                        myProfile?.followers?.length ? myProfile?.followers?.length : 0
                                                    ) : (
                                                        userProfile?.followers?.length ? userProfile?.followers?.length : 0
                                                    )}
                                                </Typography>
                                                <Typography variant={"subtitle1"} component={"span"}>
                                                    {" Following"}
                                                </Typography>
                                            </ListItem>
                                        </LinkToFollowers>
                                        <LinkToFollowers linkTo={"followers"}>
                                            <ListItem>
                                                <Typography variant={"h6"} component={"span"}>
                                                    {(userProfile?.id === myProfile?.id) ? (
                                                        myProfile?.following?.length ? myProfile?.following?.length : 0
                                                    ) : (
                                                        userProfile?.following?.length ? userProfile?.following?.length : 0
                                                    )}
                                                </Typography>
                                                <Typography variant={"subtitle1"} component={"span"}>
                                                    {" Followers"}
                                                </Typography>
                                            </ListItem>
                                        </LinkToFollowers>
                                    </List>
                                )}
                            </div>
                            {(isMyProfileBlocked || userProfile?.privateProfile) ? null : (
                                (userProfile !== undefined) && (
                                    <FollowerGroup user={userProfile} sameFollowers={sameFollowers}/>
                                )
                            )}
                        </div>
                        {isUserProfileLoading ? (
                            <Spinner/>
                        ) : (
                            (isUserProfileSuccessLoaded) && (
                                isMyProfileBlocked ? (
                                    <div className={classes.privateProfileInfo}>
                                        <Typography variant={"h4"} component={"div"}>
                                            You’re blocked
                                        </Typography>
                                        <Typography variant={"subtitle1"} component={"div"}>
                                            {`You can’t follow or see @${userProfile?.username}’s Tweets.`}
                                            <MuiLink
                                                href="https://help.twitter.com/using-twitter/someone-blocked-me-on-twitter"
                                                variant="subtitle1"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Learn more
                                            </MuiLink>
                                        </Typography>
                                    </div>
                                ) : (
                                    userProfile?.privateProfile && userProfile?.id !== myProfile?.id ? (
                                        <div className={classes.privateProfileInfo}>
                                            <Typography variant={"h4"} component={"div"}>
                                                These Tweets are protected
                                            </Typography>
                                            <Typography variant={"subtitle1"} component={"div"}>
                                                {`Only approved followers can see @${userProfile?.username}’s Tweets. To 
                                                request access, click Follow. `}
                                                <MuiLink
                                                    href="https://help.twitter.com/safety-and-security/public-and-protected-tweets"
                                                    variant="subtitle1"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    Learn more
                                                </MuiLink>
                                            </Typography>
                                        </div>
                                    ) : (
                                        <>
                                            <div className={classes.tabs}>
                                                <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
                                                    <Tab onClick={() => handleShowTweets(handleShowUserTweets)} label="Tweets"/>
                                                    <Tab onClick={() => handleShowTweets(handleShowUserRetweetsAndReplies)} label="Tweets & replies"/>
                                                    <Tab onClick={() => handleShowTweets(handleShowMediaTweets)} label="Media"/>
                                                    <Tab onClick={() => handleShowTweets(handleShowLikedTweets)} label="Likes"/>
                                                </Tabs>
                                            </div>
                                            <Divider/>
                                            <div className={classes.tweets}>
                                                <UserPageTweets
                                                    tweets={tweets}
                                                    isTweetsLoading={isTweetsLoading}
                                                    activeTab={activeTab}
                                                    userProfileId={userProfile?.id}
                                                    myProfileId={myProfile?.id}
                                                    username={userProfile?.username}
                                                />
                                            </div>
                                        </>
                                    )
                                )
                            )
                        )}
                    </div>
                    <EditProfileModal visible={visibleEditProfile} onClose={onCloseEditProfile}/>
                    <SetupProfileModal visible={visibleSetupProfile} onClose={onCloseSetupProfile}/>
                    <BlockUserModal
                        username={userProfile?.username!}
                        isUserBlocked={isUserBlocked}
                        visible={visibleBlockUserModal}
                        onClose={onCloseBlockUserModal}
                        onBlockUser={onBlockUser}
                    />
                    <ActionSnackbar
                        snackBarMessage={snackBarMessage!}
                        openSnackBar={openSnackBar!}
                        onCloseSnackBar={onCloseSnackBar!}
                    />
                </Paper>
            )}
        </InfiniteScroll>
    );
};

export default compose(withSnackbar, withHoverAction, withRouter)(UserPage) as ComponentType<SnackbarProps & HoverActionProps>;
