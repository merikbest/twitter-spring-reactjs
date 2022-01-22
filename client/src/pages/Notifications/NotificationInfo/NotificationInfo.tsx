import React, {FC, ReactElement, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import BackButton from "../../../components/BackButton/BackButton";
import {useNotificationInfoStyles} from "./NotificationInfoStyles";
import {Notification, NotificationType} from "../../../store/ducks/notifications/contracts/state";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import UsersItem, {UserItemSize} from "../../../components/UsersItem/UsersItem";

const NotificationInfo: FC = (): ReactElement => {
    const classes = useNotificationInfoStyles();
    const location = useLocation<{ notification: Notification; }>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h5">
                        {location.state.notification.notificationType === NotificationType.LIKE ? "Liked" : "Retweeted"}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        by {location.state.notification.user.fullName}
                    </Typography>
                </div>
            </Paper>
            <div style={{paddingTop: 53}}>
                <TweetComponent item={location.state.notification.tweet}/>
            </div>
            <UsersItem item={location.state.notification.user} size={UserItemSize.MEDIUM}/>
        </Paper>
    );
};

export default NotificationInfo;
