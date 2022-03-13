import React, {ChangeEvent, ComponentType, FC, ReactElement, ReactNode, useEffect, useState} from 'react';
import {Link, useHistory, useLocation, useParams, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Paper from '@material-ui/core/Paper';
import {
    Avatar,
    Button,
    Divider,
    IconButton,
    Link as MuiLink,
    List,
    ListItem,
    Typography
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';
import format from 'date-fns/format';
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import classNames from "classnames";
import classnames from "classnames";
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
    followUser,
    processFollowRequest,
    processUserToBlocklist,
    processUserToMuteList,
    unfollowUser
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
    selectUsersIsErrorLoaded,
    selectUsersIsLoading,
    selectUsersIsSuccessLoaded
} from "../../store/ducks/userProfile/selectors";
import {
    fetchImages,
    fetchUserProfile,
    processSubscribe, resetImagesState,
    resetUserProfileState
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
import FollowerGroup from "../../components/FollowerGroup/FollowerGroup";
import UserNotFound from "./UserNotFound/UserNotFound";
import {useGlobalStyles} from "../../util/globalClasses";

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
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);
    const [visibleSetupProfile, setVisibleSetupProfile] = useState<boolean>(false);
    const pagesCount = useSelector(selectPagesCount);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (params.id) {
            dispatch(fetchUserProfile(parseInt(params.id)));
            dispatch(fetchImages(parseInt(params.id)));
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
            dispatch(resetUserProfileState());
            dispatch(resetUserTweets());
            dispatch(resetImagesState());
            stompClient?.disconnect();
        };
    }, [params.id]);

    useEffect(() => {
        setBtnText(userProfile?.isWaitingForApprove ? ("Pending") : (userProfile?.isUserBlocked ? "Blocked" : "Following"));

        if (isUserProfileSuccessLoaded) {
            document.title = `${userProfile?.fullName} (@${userProfile?.username}) / Twitter`;
            dispatch(fetchUserTweets({userId: params.id, page: 0}));
            setPage(prevState => prevState + 1);
        }

        if (location.state?.isRegistered) {
            setVisibleSetupProfile(true);
        }
        return () => {
            document.title = "Twitter";
            dispatch(resetUserTweets());
        };
    }, [isUserProfileSuccessLoaded]);

    useEffect(() => {
        setBtnText(userProfile?.isWaitingForApprove ? ("Pending") : (userProfile?.isUserBlocked ? "Blocked" : "Following"));
    }, [myProfile]);

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
        if (userProfile?.isPrivateProfile && linkTo && userProfile?.id !== myProfile?.id) {
            return <div className={classes.followLink}>{children}</div>;
        } else {
            return <Link to={`/user/${userProfile?.id}/${linkTo}`} className={classes.followLink}>{children}</Link>
        }
    };

    const handleFollow = (): void => {
        if (userProfile?.isPrivateProfile) {
            dispatch(processFollowRequest(userProfile.id!));
        } else {
            if (userProfile?.isFollower) {
                dispatch(unfollowUser({userId: userProfile?.id!}));
            } else {
                dispatch(followUser({userId: userProfile?.id!}));
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
        dispatch(processUserToMuteList({userId: userProfile?.id!}));
        setSnackBarMessage!(`@${userProfile?.username} has been ${userProfile?.isUserMuted ? "unmuted" : "muted"}.`);
        setOpenSnackBar!(true);
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: userProfile?.id!}));
        setVisibleBlockUserModal(false);
        setBtnText(userProfile?.isUserBlocked ? "Following" : "Blocked");
        setSnackBarMessage!(`@${userProfile?.username} has been ${userProfile?.isUserBlocked ? "unblocked" : "blocked"}.`);
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
                            {userProfile?.isPrivateProfile && (
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
                                <Link to={{
                                    pathname: `/profile/header_photo/${userProfile?.id}`,
                                    state: {
                                        background: location,
                                        imageSrc: userProfile?.wallpaper?.src
                                    },
                                }}>
                                    <img
                                        key={userProfile?.wallpaper?.src}
                                        src={userProfile?.wallpaper?.src}
                                        alt={userProfile?.wallpaper?.src}
                                    />
                                </Link>
                            )}
                        </div>
                        <div className={classes.info}>
                            <Link to={{
                                pathname: `/profile/photo/${userProfile?.id}`, 
                                state: {
                                    background: location, 
                                    imageSrc: userProfile?.avatar?.src ? userProfile?.avatar.src : DEFAULT_PROFILE_IMG
                                },
                            }}>
                                <div style={{display: "inline-block"}}>
                                    <Avatar src={userProfile !== undefined ? userProfile?.avatar?.src ? userProfile?.avatar.src : DEFAULT_PROFILE_IMG : undefined}>
                                        <div></div>
                                    </Avatar>
                                </div>
                            </Link>
                            {(isMyProfileLoaded && isUserProfileSuccessLoaded) && (
                                userProfile?.isMyProfileBlocked ? null : (
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
                                                isUserMuted={userProfile?.isUserMuted!}
                                                isUserBlocked={userProfile?.isUserBlocked!}
                                                onMuteUser={onMuteUser}
                                                onOpenBlockUserModal={onOpenBlockUserModal}
                                                visibleMoreAction={visibleHoverAction?.visibleMoreAction}
                                                handleHoverAction={handleHoverAction}
                                                handleLeaveAction={handleLeaveAction}
                                            />
                                            {!userProfile?.isUserBlocked && (
                                                !userProfile?.isMutedDirectMessages || userProfile?.isFollower ? (
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
                                            {userProfile?.isUserBlocked ? (
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
                                                userProfile?.isFollower ? (
                                                    <>
                                                        <IconButton
                                                            onClick={handleSubscribeToNotifications}
                                                            onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                                                            onMouseLeave={handleLeaveAction}
                                                            className={globalClasses.userPageIconButton}
                                                            color="primary"
                                                        >
                                                            {userProfile?.isSubscriber ? NotificationsAddFilledIcon : NotificationsAddIcon}
                                                            <HoverAction
                                                                visible={visibleHoverAction?.visibleOtherAction}
                                                                actionText={userProfile?.isSubscriber ? "Turn off notifications" : "Notify"}
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
                                                        userProfile?.isWaitingForApprove ? (
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
                                    {userProfile?.isPrivateProfile && (
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
                            {userProfile?.isMyProfileBlocked ? null : (
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
                                {userProfile?.isMyProfileBlocked ? null : (
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
                                        {userProfile?.birthday && (
                                            <ListItem>
                                                <Typography variant={"subtitle1"} component={"span"}>
                                                    Date of Birth: {userProfile?.birthday}
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
                                {userProfile?.isMyProfileBlocked ? null : (
                                    <List className={classes.details}>
                                        <LinkToFollowers linkTo={"following"}>
                                            <ListItem>
                                                <Typography variant={"h6"} component={"span"}>
                                                    {(userProfile?.id === myProfile?.id) ? (
                                                        myProfile?.followersSize
                                                    ) : (
                                                        userProfile?.followersSize
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
                                                        myProfile?.followingSize
                                                    ) : (
                                                        userProfile?.followingSize
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
                            {userProfile?.isUserMuted && (
                                (userProfile !== undefined) && (
                                    <Typography variant={"subtitle1"} component={"div"} className={classes.description}>
                                        {"You have muted Tweets from this account. "}
                                        <Typography
                                            className={classes.unfollowLink}
                                            onClick={onMuteUser}
                                            variant={"subtitle1"}
                                            component={"span"}
                                        >
                                            Unmute
                                        </Typography>
                                    </Typography>
                                )
                            )}
                            {(userProfile?.isMyProfileBlocked || userProfile?.isPrivateProfile) ? null : (
                                (userProfile !== undefined) && (
                                    <FollowerGroup user={userProfile} sameFollowers={userProfile.sameFollowers}/>
                                )
                            )}
                        </div>
                        {isUserProfileLoading ? (
                            <Spinner/>
                        ) : (
                            (isUserProfileSuccessLoaded) && (
                                userProfile?.isMyProfileBlocked ? (
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
                                    userProfile?.isPrivateProfile && userProfile?.id !== myProfile?.id ? (
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
                        isUserBlocked={userProfile?.isUserBlocked!}
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