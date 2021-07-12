import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, CircularProgress, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';

import {LocationIcon, LinkIcon, CalendarIcon} from "../../icons";
import {useHomeStyles} from '../Home/HomeStyles';
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
import "./UserPage.scss";

const UserPage: FC<RouteComponentProps<{ id: string }>> = ({match}) => {
    const classes = useHomeStyles();
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
        <Paper className={classNames(classes.tweetsWrapper, 'user')} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">{userProfile?.fullName}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {tweets.length} Tweets
                    </Typography>
                </div>
            </Paper>
            <div className="user__header">
                <img className="user__header__img" key={userProfile?.wallpaper?.src} src={userProfile?.wallpaper?.src}/>
            </div>
            <div className="user__info">
                <div style={{display: "inline-block"}}>
                    <Avatar src={userProfile?.avatar?.src ? userProfile?.avatar.src :
                        "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}/>
                </div>
                {userProfile?.id === myProfile?.user.id ? (
                    <Button onClick={onOpenEditProfile} color="primary" className={classes.profileMenuEditButton}>
                        Edit profile
                    </Button>
                ) : (
                    <Button onClick={handleFollow} color="primary" className={classes.profileMenuEditButton}>
                        {follower ? "Unfollow" : "Follow"}
                    </Button>
                )}
                {!userProfile ? (
                    <Skeleton variant="text" width={250} height={30}/>
                ) : (
                    <h2 className="user__info-fullname">{userProfile.fullName}</h2>
                )}
                {!userProfile ? (
                    <Skeleton variant="text" width={60}/>
                ) : (
                    <span className="user__info-username">@{userProfile.username}</span>
                )}
                <p className="user__info-description">{userProfile?.about}</p>
                <ul className="user__info-details">
                    {userProfile?.location ?
                        <li>
                            <span>{LocationIcon}</span><span>{userProfile?.location}</span>
                        </li> : null}
                    {userProfile?.website ?
                        <li>
                            <span>{LinkIcon}</span>
                            <a className="link" href={userProfile?.website}>{userProfile?.website}</a>
                        </li> : null}
                    {userProfile?.dateOfBirth ?
                        <li>
                            Date of Birth: {userProfile?.dateOfBirth}
                        </li> : null}
                    {userProfile?.registration ?
                        <li>
                            <span>{CalendarIcon}</span> Joined: {userProfile?.registration}
                        </li> : null}
                    <li><span>{CalendarIcon}</span> Joined: June 2021</li>
                </ul>
                <ul className="user__info-details">
                    <Link to={`/user/${userProfile?.id}/following`}
                          style={{textDecoration: 'none',
                              color: "rgb(83, 100, 113)",}}>
                        <li><b>{userProfile?.followers?.length ? userProfile?.followers?.length : 0}</b> Following</li>
                    </Link>
                    <Link to={`/user/${userProfile?.id}/followers`}
                          style={{textDecoration: 'none', color: "rgb(83, 100, 113)",}}>
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
            <div className="user__tweets">
                {isTweetsLoading ? (
                    <div className={classes.tweetsCentred}>
                        <CircularProgress/>
                    </div>
                ) : (
                    <UserPageTweets
                        tweets={tweets}
                        classes={classes}
                        activeTab={activeTab}
                        userProfileId={userProfile?.id}
                        myProfileId={myProfile?.user.id}
                        username={userProfile?.username}
                    />
                )}
            </div>
            {visibleEditProfile ?
                <EditProfileModal classes={classes} visible={visibleEditProfile} onClose={onCloseEditProfile}/>
                : null
            }
        </Paper>
    );
};

export default UserPage;
