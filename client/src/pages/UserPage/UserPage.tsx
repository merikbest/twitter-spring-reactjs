import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {RouteComponentProps, Link, useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, CircularProgress, IconButton, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';
import format from 'date-fns/format';
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

import {LocationIcon, LinkIcon, CalendarIcon, MessagesIcon} from "../../icons";
import {useUserPageStyles} from "./UserPageStyles";
import {BackButton} from "../../components/BackButton/BackButton";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import {fetchUserData, follow, unfollow} from "../../store/ducks/user/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchRelevantUsers} from "../../store/ducks/users/actionCreators";
import {fetchTags} from "../../store/ducks/tags/actionCreators";
import {selectIsUserTweetsLoading, selectUserTweetsItems} from "../../store/ducks/userTweets/selectors";
import {
    fetchUserTweets,
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserRetweetsAndReplies,
    setUserTweets,
    setAddedUserTweet,
    setUpdatedUserTweet,
    deleteUserTweet
} from "../../store/ducks/userTweets/actionCreators";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import {fetchUserProfile, followUserProfile, unfollowUserProfile} from "../../store/ducks/userProfile/actionCreators";
import UserPageTweets from "./UserPageTweets";
import {DEFAULT_PROFILE_IMG, WS_URL} from "../../util/url";
import SetupProfileModal from "../SetupProfileModal/SetupProfileModal";
import UserPageActions from "./UserPageActions/UserPageActions";
import {createChat} from "../../store/ducks/chats/actionCreators";

let stompClient: CompatClient | null = null;

const UserPage: FC<RouteComponentProps<{ id: string }>> = ({match}): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const tweets = useSelector(selectUserTweetsItems);
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const location = useLocation<{ isRegistered: boolean; }>();
    const history = useHistory();

    const [btnText, setBtnText] = useState<string>("Following");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);
    const [visibleSetupProfile, setVisibleSetupProfile] = useState<boolean>(false);

    const follower = myProfile?.followers?.find((user) => user.id === userProfile?.id);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (match.params.id) {
            dispatch(fetchUserProfile(match.params.id));
        }
        dispatch(fetchUserData());
        dispatch(fetchRelevantUsers());
        dispatch(fetchTags());
        document.body.style.overflow = 'unset';

        stompClient = Stomp.over(new SockJS(WS_URL));
        stompClient.connect({}, () => {
            stompClient?.subscribe("/topic/user/add/tweet/" + match.params.id, (response) => {
                dispatch(setAddedUserTweet(JSON.parse(response.body)));
            });
            stompClient?.subscribe("/topic/user/update/tweet/" + match.params.id, (response) => {
                if (JSON.parse(response.body).tweetDeleted) {
                    dispatch(deleteUserTweet(JSON.parse(response.body)));
                } else {
                    dispatch(setUpdatedUserTweet(JSON.parse(response.body)));
                }
            });
        });

        return () => {
            stompClient?.disconnect();
        };
    }, [match.params.id]);

    useEffect(() => {
        if (userProfile) {
            dispatch(fetchUserTweets(match.params.id));
        }

        if (location.state?.isRegistered) {
            setVisibleSetupProfile(true);
        }

        return () => {
            dispatch(setUserTweets([]));
        };
    }, [userProfile]);

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

    const handleFollow = (): void => {
        if (follower) {
            dispatch(unfollowUserProfile(userProfile!));
            dispatch(unfollow(userProfile!));
        } else {
            dispatch(followUserProfile(userProfile!));
            dispatch(follow(userProfile!));
        }
    };

    const handleShowUserTweets = (): void => {
        dispatch(fetchUserTweets(match.params.id));
    };

    const handleShowUserRetweetsAndReplies = (): void => {
        dispatch(fetchUserRetweetsAndReplies(match.params.id));
    };

    const handleShowLikedTweets = (): void => {
        dispatch(fetchUserLikedTweets(match.params.id));
    };

    const handleShowMediaTweets = (): void => {
        dispatch(fetchUserMediaTweets(match.params.id));
    };

    const handleClickAddUserToChat = (): void => {
        dispatch(createChat(userProfile?.id!));
        history.push("/messages");
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">{userProfile?.fullName}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {userProfile?.tweetCount} Tweets
                    </Typography>
                </div>
            </Paper>
            <div style={{paddingTop: 53,}}>
                <div className={classes.wallpaper}>
                    <img key={userProfile?.wallpaper?.src} src={userProfile?.wallpaper?.src}
                         alt={userProfile?.wallpaper?.src}/>
                </div>
                <div className={classes.info}>
                    <div style={{display: "inline-block"}}>
                        <Avatar src={userProfile?.avatar?.src ? userProfile?.avatar.src : DEFAULT_PROFILE_IMG}/>
                    </div>
                    {userProfile?.id === myProfile?.id ? (
                        <Button
                            onClick={myProfile?.profileCustomized ? onOpenEditProfile : onOpenSetupProfile}
                            color="primary"
                            className={classes.editButton}
                        >
                            {myProfile?.profileCustomized ? "Edit profile" : "Setup profile"}
                        </Button>
                    ) : (
                        <div className={classes.buttonWrapper}>
                            <UserPageActions user={userProfile!}/>
                            <IconButton
                                className={classes.messageButton}
                                onClick={handleClickAddUserToChat}
                                color="primary"
                            >
                                {MessagesIcon}
                            </IconButton>
                            {follower ? (
                                <Button
                                    onClick={handleFollow}
                                    className={classes.primaryButton}
                                    color="primary"
                                    variant="contained"
                                    onMouseOver={() => setBtnText("Unfollow")}
                                    onMouseLeave={() => setBtnText("Following")}
                                >
                                    {btnText}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleFollow}
                                    className={classes.editButton}
                                    color="primary"
                                >
                                    Follow
                                </Button>
                            )}
                        </div>
                    )}
                    {!userProfile ? (
                        <Skeleton variant="text" width={250} height={30}/>
                    ) : (
                        <h2 className={classes.fullName}>{userProfile.fullName}</h2>
                    )}
                    {!userProfile ? (
                        <Skeleton variant="text" width={60}/>
                    ) : (
                        <span className={classes.username}>@{userProfile.username}</span>
                    )}
                    <p className={classes.description}>{userProfile?.about}</p>
                    <ul className={classes.details}>
                        {userProfile?.location &&
                        <li>
                            <span>{LocationIcon}</span><span>{userProfile?.location}</span>
                        </li>
                        }
                        {userProfile?.website &&
                        <li>
                            <span>{LinkIcon}</span>
                            <a className="link" href={userProfile?.website}>{userProfile?.website}</a>
                        </li>
                        }
                        {userProfile?.dateOfBirth &&
                        <li>
                            Date of Birth: {userProfile?.dateOfBirth}
                        </li>
                        }
                        {userProfile?.registrationDate &&
                        <li>
                            <span>{CalendarIcon}</span> Joined: {format(new Date(userProfile?.registrationDate), 'MMMM yyyy')}
                        </li>
                        }
                    </ul>
                    <ul className={classes.details}>
                        <Link to={`/user/${userProfile?.id}/following`} className={classes.followLink}>
                            {userProfile?.id === myProfile?.id ? (
                                <li>
                                    <b>{myProfile?.followers?.length ? myProfile?.followers?.length : 0}</b> Following
                                </li>
                            ) : (
                                <li>
                                    <b>{userProfile?.followers?.length ? userProfile?.followers?.length : 0}</b> Following
                                </li>
                            )}
                        </Link>
                        <Link to={`/user/${userProfile?.id}/followers`} className={classes.followLink}>
                            {userProfile?.id === myProfile?.id ? (
                                <li>
                                    <b>{myProfile?.following?.length ? myProfile?.following?.length : 0}</b> Followers
                                </li>
                            ) : (
                                <li>
                                    <b>{userProfile?.following?.length ? userProfile?.following?.length : 0}</b> Followers
                                </li>
                            )}
                        </Link>
                    </ul>
                </div>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
                        <Tab onClick={handleShowUserTweets} label="Tweets"/>
                        <Tab onClick={handleShowUserRetweetsAndReplies} label="Tweets & replies"/>
                        <Tab onClick={handleShowMediaTweets} label="Media"/>
                        <Tab onClick={handleShowLikedTweets} label="Likes"/>
                    </Tabs>
                </div>
                <div className={classes.tweets}>
                    {isTweetsLoading ? (
                        <div className={classes.tweetsCentred}>
                            <CircularProgress/>
                        </div>
                    ) : (
                        <UserPageTweets
                            tweets={tweets}
                            activeTab={activeTab}
                            userProfileId={userProfile?.id}
                            myProfileId={myProfile?.id}
                            username={userProfile?.username}
                        />
                    )}
                </div>
            </div>
            {visibleEditProfile && <EditProfileModal visible={visibleEditProfile} onClose={onCloseEditProfile}/>}
            {visibleSetupProfile && <SetupProfileModal visible={visibleSetupProfile} onClose={onCloseSetupProfile}/>}
        </Paper>
    );
};

export default UserPage;
