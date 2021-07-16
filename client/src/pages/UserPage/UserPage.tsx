import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, CircularProgress, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';

import {LocationIcon, LinkIcon, CalendarIcon} from "../../icons";
import {useUserPageStyles} from "./UserPageStyles";
import {BackButton} from "../../components/BackButton/BackButton";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import {fetchRelevantUsers} from "../../store/ducks/users/actionCreators";
import {fetchTags} from "../../store/ducks/tags/actionCreators";
import {selectIsUserTweetsLoading, selectUserTweetsItems} from "../../store/ducks/userTweets/selectors";
import {fetchUserTweets, fetchUserLikedTweets, fetchUserMediaTweets} from "../../store/ducks/userTweets/actionCreators";
import {selectUserProfile} from "../../store/ducks/userProfile/selectors";
import {fetchUserProfile, followUserProfile, unfollowUserProfile} from "../../store/ducks/userProfile/actionCreators";
import UserPageTweets from "./UserPageTweets";
import {DEFAULT_PROFILE_IMG} from "../../util/url";

const UserPage: FC<RouteComponentProps<{ id: string }>> = ({match}) => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const tweets = useSelector(selectUserTweetsItems);
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);
    const follower = userProfile?.following?.find((user) => user.id === myProfile?.user.id);

    useEffect(() => {
        if (match.params.id) {
            dispatch(fetchUserProfile(match.params.id));
        }
        dispatch(fetchUserData());
        dispatch(fetchRelevantUsers());
        dispatch(fetchTags());
        document.body.style.overflow = 'unset';
    }, [match.params.id]);

    useEffect(() => {
        if (userProfile) {
            dispatch(fetchUserTweets(match.params.id));
        }
    }, [userProfile]);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    const onOpenEditProfile = () => {
        setVisibleEditProfile(true);
    };

    const onCloseEditProfile = () => {
        setVisibleEditProfile(false);
    };

    const handleFollow = () => {
        if (follower) {
            dispatch(unfollowUserProfile(userProfile!));
        } else {
            dispatch(followUserProfile(userProfile!));
        }
    };

    const handleShowUserTweets = () => {
        dispatch(fetchUserTweets(match.params.id));
    };

    const handleShowLikedTweets = () => {
        dispatch(fetchUserLikedTweets(match.params.id));
    };

    const handleShowMediaTweets = () => {
        dispatch(fetchUserMediaTweets(match.params.id));
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">{userProfile?.fullName}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {tweets.length} Tweets
                    </Typography>
                </div>
            </Paper>
            <div className={classes.wallpaper}>
                <img key={userProfile?.wallpaper?.src} src={userProfile?.wallpaper?.src} alt={userProfile?.wallpaper?.src}/>
            </div>
            <div className={classes.info}>
                <div style={{display: "inline-block"}}>
                    <Avatar src={userProfile?.avatar?.src ? userProfile?.avatar.src : DEFAULT_PROFILE_IMG}/>
                </div>
                {userProfile?.id === myProfile?.user.id ? (
                    <Button onClick={onOpenEditProfile} color="primary" className={classes.editButton}>
                        Edit profile
                    </Button>
                ) : (
                    <Button onClick={handleFollow} color="primary" className={classes.editButton}>
                        {follower ? "Unfollow" : "Follow"}
                    </Button>
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
                    {userProfile?.registration &&
                        <li>
                            <span>{CalendarIcon}</span> Joined: {userProfile?.registration}
                        </li>
                    }
                    <li><span>{CalendarIcon}</span> Joined: June 2021</li>
                </ul>
                <ul className={classes.details}>
                    <Link to={`/user/${userProfile?.id}/following`} className={classes.followLink}>
                        <li><b>{userProfile?.followers?.length ? userProfile?.followers?.length : 0}</b> Following</li>
                    </Link>
                    <Link to={`/user/${userProfile?.id}/followers`} className={classes.followLink}>
                        <li><b>{userProfile?.following?.length ? userProfile?.following?.length : 0}</b> Followers</li>
                    </Link>
                </ul>
            </div>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
                <Tab onClick={handleShowUserTweets} label="Tweets"/>
                <Tab onClick={handleShowUserTweets} label="Tweets & replies"/>
                <Tab onClick={handleShowMediaTweets} label="Media"/>
                <Tab onClick={handleShowLikedTweets} label="Likes"/>
            </Tabs>
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
                        myProfileId={myProfile?.user.id}
                        username={userProfile?.username}
                    />
                )}
            </div>
            {visibleEditProfile && <EditProfileModal visible={visibleEditProfile} onClose={onCloseEditProfile}/>}
        </Paper>
    );
};

export default UserPage;
