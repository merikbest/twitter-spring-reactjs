import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Avatar, CircularProgress, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import {useNotificationsStyles} from "./NotificationsStyles";
import {LikeIcon, RetweetIcon} from "../../icons";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {textFormatter} from "../../util/textFormatter";
import {selectIsNotificationsLoading, selectNotificationsItems} from "../../store/ducks/notifications/selectors";
import {fetchNotifications} from "../../store/ducks/notifications/actionCreators";
import {fetchUserData} from "../../store/ducks/user/actionCreators";

const Notifications: FC = (): ReactElement => {
    const classes = useNotificationsStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const notifications = useSelector(selectNotificationsItems);
    const isNotificationLoading = useSelector(selectIsNotificationsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchNotifications());
        dispatch(fetchUserData());
    }, []);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleClickUser = (userId: number, event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/user/${userId}`);
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header}>
                <div>
                    <Typography variant="h6">Notifications</Typography>
                </div>
            </Paper>
            <div style={{paddingTop: 57,}}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label="All"/>
                        <Tab className={classes.tab} label="Mentions"/>
                    </Tabs>
                </div>
                {isNotificationLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress/>
                    </div>
                ) : (
                    (activeTab === 0) ? (
                        (notifications.length === 0) ? (
                            <div>
                                <div className={classes.title}>
                                    Nothing to see here — yet
                                </div>
                                <div className={classes.text}>
                                    From like to Retweets and whole lot more, this is where all the actions happens.
                                </div>
                            </div>
                        ) : (
                            <div>
                                {notifications.map((notification) => (
                                    <Link className={classes.notificationLink} to={{
                                        pathname: "/notification",
                                        state: {notification: notification}
                                    }}>
                                        <Paper className={classes.notificationWrapper} variant="outlined">
                                            <div className={classes.notificationIcon}>
                                                {(notification.notificationType === "LIKE") ? (
                                                    <span id={"like"}>{LikeIcon}</span>
                                                ) : (
                                                    <span id={"retweet"}>{RetweetIcon}</span>
                                                )}
                                            </div>
                                            <div style={{flex: 1}}>
                                                <a href={`/user/${notification.user.id!}`}
                                                   onClick={event => handleClickUser(notification.user.id!, event)}>
                                                    <Avatar
                                                        className={classes.notificationAvatar}
                                                        alt={`avatar ${notification.id}`}
                                                        src={(notification.user.avatar?.src) ?
                                                            (notification.user.avatar?.src) : (DEFAULT_PROFILE_IMG)}/>
                                                </a>
                                                <div className={classes.notificationInfo}>
                                                    <b>{notification.user.username} </b>
                                                    {(notification.notificationType === "LIKE") ? "liked" : "Retweeted"} your
                                                    Tweet
                                                </div>
                                                <div className={classes.notificationText}>
                                                    {textFormatter(notification.tweet.text)}
                                                </div>
                                            </div>
                                        </Paper>
                                    </Link>
                                ))}
                            </div>
                        )
                    ) : (
                        <div>
                            <div className={classes.title}>
                                Nothing to see here — yet
                            </div>
                            <div className={classes.text}>
                                When someone mentions you, you’ll find it here.
                            </div>
                        </div>
                    )
                )}
            </div>
        </Paper>
    );
};

export default Notifications;
