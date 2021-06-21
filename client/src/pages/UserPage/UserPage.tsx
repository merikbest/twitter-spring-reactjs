import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, CircularProgress, Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Skeleton from '@material-ui/lab/Skeleton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';

import {useHomeStyles} from '../Home/HomeStyles';
import {BackButton} from "../../components/BackButton/BackButton";
import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {fetchTweets} from "../../store/ducks/tweets/actionCreators";
import {AuthApi} from "../../services/api/authApi";
import Tweet from "../../components/Tweet/Tweet";
import {User} from "../../store/ducks/user/contracts/state";
import "./UserPage.scss";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import {fetchUserData} from "../../store/ducks/user/actionCreators";

const UserPage: FC<RouteComponentProps<{ id: string }>> = ({match}) => {
    const classes = useHomeStyles();
    const tweets = useSelector(selectTweetsItems);
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTweetsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [userData, setUserData] = useState<User | undefined>();
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    useEffect(() => {
        const userId = match.params.id;
        dispatch(fetchTweets());
        if (userId) {
            AuthApi.getUserInfo(userId).then((data) => {
                setUserData(data);
            });
        }
    }, [dispatch]);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    const onOpenEditProfile = () => {
        setVisibleEditProfile(true);
    };

    const onCloseEditProfile = () => {
        setVisibleEditProfile(false);
    };

    return (
        <Paper className={classNames(classes.tweetsWrapper, 'user')} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">{userData?.fullName}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {tweets.length} Tweets
                    </Typography>
                </div>
            </Paper>
            <div className="user__header">
                <img className="user__header__img" key={userData?.wallpaper?.src} src={userData?.wallpaper?.src}/>
            </div>
            <div className="user__info">
                <div style={{display: "inline-block"}}>
                    <Avatar src={userData?.avatar?.src ? userData?.avatar.src :
                        "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"}/>
                </div>
                <Button onClick={onOpenEditProfile} className={classes.profileMenuEditButton}>Edit profile</Button>
                {!userData ? (
                    <Skeleton variant="text" width={250} height={30}/>
                ) : (
                    <h2 className="user__info-fullname">{userData.fullName}</h2>
                )}
                {!userData ? (
                    <Skeleton variant="text" width={60}/>
                ) : (
                    <span className="user__info-username">@{userData.username}</span>
                )}
                <p className="user__info-description">{userData?.about}</p>
                <ul className="user__info-details">
                    {userData?.location ?
                        <li>
                            <LocationOnOutlinedIcon className="user__info-icon"/>{userData?.location}
                        </li> : null}
                    {userData?.website ?
                        <li>
                            <LinkOutlinedIcon className="user__info-icon"/>
                            <a className="link" href={userData?.website}>{userData?.website}</a>
                        </li> : null}
                    {userData?.dateOfBirth ?
                        <li>
                            Дата рождения: {userData?.dateOfBirth}
                        </li> : null}
                    {userData?.registration ?
                        <li>
                            <DateRangeIcon className="user__info-icon"/> Joined: {userData?.registration}
                        </li> : null}
                    <li><DateRangeIcon className="user__info-icon"/> Joined: June 2021</li>
                </ul>
                <br/>
                <ul className="user__info-details">
                    <li><b>0</b> Following</li>
                    <li><b>0</b> Followers</li>
                </ul>
            </div>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
                <Tab label="Tweets"/>
                <Tab label="Tweets & replies"/>
                <Tab label="Media"/>
                <Tab label="Likes"/>
            </Tabs>
            <div className="user__tweets">
                {isLoading ? (
                    <div className={classes.tweetsCentred}>
                        <CircularProgress/>
                    </div>
                ) : (
                    tweets.map((tweet) => (
                        <Tweet key={tweet.id} classes={classes} images={tweet.images} {...tweet} />
                    ))
                )}
            </div>
            {visibleEditProfile ? <EditProfileModal visible={visibleEditProfile} onClose={onCloseEditProfile}/> : null}
        </Paper>
    );
};

export default UserPage;
