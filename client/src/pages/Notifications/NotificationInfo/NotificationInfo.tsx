import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import BackButton from "../../../components/BackButton/BackButton";
import {useNotificationInfoStyles} from "./NotificationInfoStyles";
import {User} from "../../../store/ducks/user/contracts/state";
import {Notification, NotificationType} from "../../../store/ducks/notifications/contracts/state";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import {followUser, unfollowUser} from "../../../store/ducks/user/actionCreators";
import Follower from "../../../components/Follower/Follower";

const NotificationInfo: FC = (): ReactElement => {
    const classes = useNotificationInfoStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ notification: Notification; }>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">
                        {location.state.notification.notificationType === NotificationType.LIKE ? "Liked" : "Retweeted"}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        by {location.state.notification.user.fullName}
                    </Typography>
                </div>
            </Paper>
            <div style={{paddingTop: 53,}}>
                <TweetComponent item={location.state.notification.tweet}/>
            </div>
            <Follower item={location.state.notification.user} follow={handleFollow} unfollow={handleUnfollow}/>
        </Paper>
    );
};

export default NotificationInfo;
