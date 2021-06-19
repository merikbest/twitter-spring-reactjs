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

import {useHomeStyles} from '../Home/HomeStyles';
import {BackButton} from "../../components/BackButton/BackButton";
import {selectIsTweetsLoading, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {fetchTweets} from "../../store/ducks/tweets/actionCreators";
import {AuthApi} from "../../services/api/authApi";
import Tweet from "../../components/Tweet/Tweet";
import {User} from "../../store/ducks/user/contracts/state";
import "./UserPage.scss";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import ModalBlock from "../../components/ModalBlock/ModalBlock";

const UserPage: FC<RouteComponentProps<{ id: string }>> = ({match}) => {
    const classes = useHomeStyles();
    const tweets = useSelector(selectTweetsItems);
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTweetsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [userData, setUserData] = useState<User | undefined>();
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);

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
                        {tweets.length} твита
                    </Typography>
                </div>
            </Paper>
            <div className="user__header"></div>
            <div className="user__info">
                <div style={{display: "inline-block"}}>
                    <Avatar />
                </div>
                <Button onClick={onOpenEditProfile} className={classes.profileMenuEditButton}>Изменить профиль</Button>
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
                    {userData?.location ? <li>userData?.location</li> : null}
                    {userData?.website ? <li><a className="link" href={userData?.website}>{userData?.website}</a></li> : null}
                    {userData?.dateOfBirth ? <li>Дата рождения: {userData?.dateOfBirth}</li> : null}
                    {userData?.registration ? <li>Регистрация: {userData?.registration}</li> : null}
                    <li><DateRangeIcon/> Регистрация: June 2021</li>
                </ul>
                <br/>
                <ul className="user__info-details">
                    <li><b>0</b> в читаемых</li>
                    <li><b>0</b> в читателей</li>
                </ul>
            </div>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
                <Tab label="Твиты"/>
                <Tab label="Твиты и ответы"/>
                <Tab label="Медиа"/>
                <Tab label="Нравится"/>
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
            <ModalBlock
                visible={visibleEditProfile}
                title={"Edit"}
                onClose={onCloseEditProfile}>
                <p>Hello world</p>
            </ModalBlock>
        </Paper>
    );
};

export default UserPage;
