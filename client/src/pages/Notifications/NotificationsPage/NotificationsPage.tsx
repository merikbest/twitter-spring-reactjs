import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

import {fetchNotifications, resetNotificationState} from "../../../store/ducks/notifications/actionCreators";
import {fetchUserData} from "../../../store/ducks/user/actionCreators";
import {
    selectIsNotificationsLoading,
    selectNotificationsList,
    selectNotificationsTweetAuthors
} from "../../../store/ducks/notifications/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import {NOTIFICATIONS_TIMELINE, PROFILE} from "../../../util/pathConstants";
import {NotificationsIconFilled} from "../../../icons";
import NotificationAuthorItem from "./NotificationAuthorItem/NotificationAuthorItem";
import NotificationItem from "./NotificationItem/NotificationItem";
import {useNotificationsPageStyles} from "./NotificationsPageStyles";
import EmptyNotifications from "../EmptyNotifications/EmptyNotifications";

const NotificationsPage: FC = (): ReactElement => {
    const classes = useNotificationsPageStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const notifications = useSelector(selectNotificationsList);
    const tweetAuthors = useSelector(selectNotificationsTweetAuthors);
    const isNotificationLoading = useSelector(selectIsNotificationsLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchNotifications());
        dispatch(fetchUserData());

        return () => {
            dispatch(resetNotificationState());
        };
    }, []);

    const handleClickUser = (userId: number, event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`${PROFILE}/${userId}`);
    };

    return (
        <>
            {isNotificationLoading ? (
                <Spinner/>
            ) : (
                (!notifications.length) ? (
                    <EmptyNotifications isNotification={true}/>
                ) : (
                    <>
                        {(tweetAuthors.length !== 0) && (
                            <Link to={NOTIFICATIONS_TIMELINE}>
                                <Paper className={classes.notificationWrapper} variant="outlined">
                                    <div className={classes.notificationIcon}>
                                        <span id={"notification"}>
                                            {NotificationsIconFilled}
                                        </span>
                                    </div>
                                    <div style={{flex: 1}}>
                                        {tweetAuthors.slice(0, 6).map((tweetAuthor, index) => (
                                            <NotificationAuthorItem key={index} tweetAuthor={tweetAuthor}/>
                                        ))}
                                        <Typography 
                                            variant={"body1"} 
                                            component={"div"}
                                            className={classes.notificationInfoText}
                                        >
                                            {"New Tweet notifications for "}
                                            <Typography variant={"h6"} component={"span"}>
                                                {tweetAuthors[0].fullName}
                                            </Typography>
                                            {(tweetAuthors.length > 2) ? (
                                                ` and ${tweetAuthors.length - 1} others`
                                            ) : (
                                                (tweetAuthors.length === 2) && (
                                                    <>
                                                        <Typography 
                                                            variant={"body1"} 
                                                            component={"span"}
                                                            className={classes.notificationInfoText}
                                                        >
                                                            {" and "}
                                                        </Typography>
                                                        <Typography variant={"h6"} component={"span"}>
                                                            {tweetAuthors[1].fullName}
                                                        </Typography>
                                                    </>
                                                )
                                            )}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Link>
                        )}
                        {notifications.map((notification, index) => (
                            <NotificationItem
                                key={index}
                                notification={notification}
                                handleClickUser={handleClickUser}
                            />
                        ))}
                    </>
                )
            )}
        </>
    );
};

export default NotificationsPage;
