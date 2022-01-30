import React, {ChangeEvent, FC, ReactElement, ReactNode, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Avatar, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";

import {useNotificationsStyles} from "./NotificationsStyles";
import {LikeIcon, NotificationsIconFilled, ProfileIconFilled, RetweetIcon} from "../../icons";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {textFormatter} from "../../util/textFormatter";
import {
    selectIsNotificationsLoading,
    selectNotificationsList,
    selectNotificationsTweetAuthors
} from "../../store/ducks/notifications/selectors";
import {fetchNotifications, resetNotificationState} from "../../store/ducks/notifications/actionCreators";
import {fetchUserData} from "../../store/ducks/user/actionCreators";
import {Notification, NotificationType} from "../../store/ducks/notifications/contracts/state";
import Spinner from "../../components/Spinner/Spinner";
import {HoverUserProps, withHoverUser} from "../../hoc/withHoverUser";
import PopperUserWindow from "../../components/PopperUserWindow/PopperUserWindow";
import {useGlobalStyles} from "../../util/globalClasses";

const Notifications: FC<HoverUserProps> = (
    {
        visibleUser,
        visiblePopperWindow,
        handleHoverPopper,
        handleHoverPopperWithUser,
        handleLeavePopper
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useNotificationsStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const notifications = useSelector(selectNotificationsList);
    const tweetAuthors = useSelector(selectNotificationsTweetAuthors);
    const isNotificationLoading = useSelector(selectIsNotificationsLoading);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchNotifications());
        dispatch(fetchUserData());

        return () => {
            dispatch(resetNotificationState());
        };
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
        <Paper className={classnames(globalClasses.pageContainer, classes.container)} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.header)}>
                <div className={globalClasses.pageHeaderTitleWrapper}>
                    <Typography variant="h5">
                        Notifications
                    </Typography>
                </div>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label="All"/>
                        <Tab className={classes.tab} label="Mentions"/>
                    </Tabs>
                </div>
                {isNotificationLoading ? (
                    <Spinner/>
                ) : (
                    (activeTab === 0) ? (
                        (notifications.length === 0) ? (
                            <div className={classes.infoWindow}>
                                <Typography variant={"h4"} component={"div"}>
                                    Nothing to see here — yet
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    From like to Retweets and whole lot more, this is where all the actions happens.
                                </Typography>
                            </div>
                        ) : (
                            <div>
                                {(tweetAuthors.length !== 0) && (
                                    <Link to={"/notifications/timeline"}>
                                        <Paper className={classes.notificationWrapper} variant="outlined">
                                            <div className={classes.notificationIcon}>
                                                <span id={"notification"}>
                                                    {NotificationsIconFilled}
                                                </span>
                                            </div>
                                            <div style={{flex: 1}}>
                                                {tweetAuthors.slice(0, 6).map((tweetAuthor) => (
                                                    <div
                                                        key={tweetAuthor.id}
                                                        className={classes.notificationAvatarWrapper}
                                                        onMouseEnter={() => handleHoverPopperWithUser!(tweetAuthor)}
                                                        onMouseLeave={handleLeavePopper}
                                                    >
                                                        <Avatar
                                                            className={classes.notificationAvatar}
                                                            alt={`avatar ${tweetAuthor?.id!}`}
                                                            src={(tweetAuthor?.avatar?.src) ? (
                                                                tweetAuthor?.avatar?.src
                                                            ) : (
                                                                DEFAULT_PROFILE_IMG
                                                            )}
                                                        />
                                                        <PopperUserWindow
                                                            visible={visiblePopperWindow && visibleUser?.id === tweetAuthor.id}
                                                            user={tweetAuthor}
                                                        />
                                                    </div>
                                                ))}
                                                <Typography variant={"body1"} component={"div"} className={classes.notificationInfoText}>
                                                    {"New Tweet notifications for "}
                                                    <Typography variant={"h6"} component={"span"}>
                                                        {tweetAuthors[0].fullName}
                                                    </Typography>
                                                    {(tweetAuthors.length > 2) ? (
                                                        ` and ${tweetAuthors.length -1} others`
                                                    ) : (
                                                        (tweetAuthors.length === 2) && (
                                                            " and " +
                                                            <Typography variant={"h6"} component={"span"}>
                                                                {tweetAuthors[1].fullName}
                                                            </Typography>
                                                        )
                                                    )}
                                                </Typography>
                                            </div>
                                        </Paper>
                                    </Link>
                                )}
                                {notifications.map((notification) => (
                                    <NotificationWithLink key={notification.id} notification={notification}>
                                        <Paper className={classes.notificationWrapper} variant="outlined">
                                            <div className={classes.notificationIcon}>
                                                {(notification.notificationType === NotificationType.LIKE) && (
                                                    <span id={"like"}>{LikeIcon}</span>
                                                )}
                                                {(notification.notificationType === NotificationType.RETWEET) && (
                                                    <span id={"retweet"}>{RetweetIcon}</span>
                                                )}
                                                {(notification.notificationType === NotificationType.FOLLOW) && (
                                                    <span id={"follow"}>{ProfileIconFilled}</span>
                                                )}
                                            </div>
                                            <div style={{flex: 1}}>
                                                <a href={`/user/${notification.user.id!}`}
                                                   onClick={event => handleClickUser(notification.user.id!, event)}
                                                   onMouseEnter={handleHoverPopper}
                                                   onMouseLeave={handleLeavePopper}
                                                >
                                                    <Avatar
                                                        className={classes.notificationAvatar}
                                                        alt={`avatar ${notification.id}`}
                                                        src={(notification.user.avatar?.src) ? (
                                                            notification.user.avatar?.src
                                                        ) : (
                                                            DEFAULT_PROFILE_IMG
                                                        )}
                                                    />
                                                    <PopperUserWindow
                                                        visible={visiblePopperWindow && !visibleUser}
                                                        user={notification.user}
                                                    />
                                                </a>
                                                <div className={classes.notificationInfo}>
                                                    <Typography variant={"h6"} component={"span"}>
                                                        {`${notification.user.username} `}
                                                    </Typography>
                                                    <Typography variant={"body1"} component={"span"}>
                                                        {notification.notificationType === NotificationType.FOLLOW ? (
                                                            <>followed you</>
                                                        ) : (
                                                            <>
                                                                {(notification.notificationType === NotificationType.LIKE) ? (
                                                                    "liked"
                                                                ) : (
                                                                    "Retweeted"
                                                                )} your Tweet
                                                            </>
                                                        )}
                                                    </Typography>
                                                </div>
                                                <Typography variant={"body1"} component={"div"} className={classes.notificationText}>
                                                    {notification.tweet && textFormatter(notification.tweet.text)}
                                                </Typography>
                                            </div>
                                        </Paper>
                                    </NotificationWithLink>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className={classes.infoWindow}>
                            <Typography variant={"h4"} component={"div"}>
                                Nothing to see here — yet
                            </Typography>
                            <Typography variant={"subtitle1"} component={"div"}>
                                When someone mentions you, you’ll find it here.
                            </Typography>
                        </div>
                    )
                )}
            </div>
        </Paper>
    );
};

interface NotificationWithLinkProps {
    notification: Notification,
    children: ReactNode
}

const NotificationWithLink: FC<NotificationWithLinkProps> = ({notification, children}) => {
    return (
        <div>
            {(notification.notificationType !== NotificationType.FOLLOW) ? (
                <Link to={{pathname: "/notification", state: {notification: notification}}}>
                    {children}
                </Link>
            ) : (
                <Link to={`/user/${notification.user.id}`}>
                    {children}
                </Link>
            )}
        </div>
    );
};

export default withHoverUser(Notifications);
