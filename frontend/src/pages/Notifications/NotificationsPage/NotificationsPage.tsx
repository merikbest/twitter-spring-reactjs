import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import {
    fetchFetchTweetAuthorsNotifications,
    fetchNotifications,
    resetNotificationState
} from "../../../store/ducks/notifications/actionCreators";
import { resetNotifications } from "../../../store/ducks/user/actionCreators";
import {
    selectIsNotificationsLoading,
    selectNotificationsList,
    selectNotificationsTweetAuthors,
    selectPagesCount
} from "../../../store/ducks/notifications/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import { NOTIFICATIONS_TIMELINE } from "../../../constants/path-constants";
import { NotificationsIconFilled } from "../../../icons";
import NotificationAuthorItem from "./NotificationAuthorItem/NotificationAuthorItem";
import NotificationItem from "./NotificationItem/NotificationItem";
import { useNotificationsPageStyles } from "./NotificationsPageStyles";
import EmptyNotifications from "../EmptyNotifications/EmptyNotifications";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";

const NotificationsPage: FC = (): ReactElement => {
    const classes = useNotificationsPageStyles();
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotificationsList);
    const pagesCount = useSelector(selectPagesCount);
    const tweetAuthors = useSelector(selectNotificationsTweetAuthors);
    const isNotificationLoading = useSelector(selectIsNotificationsLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadNotifications(0);
        dispatch(resetNotifications());
        dispatch(fetchFetchTweetAuthorsNotifications());

        return () => {
            dispatch(resetNotificationState());
        };
    }, []);

    const loadNotifications = (page: number): void => {
        dispatch(fetchNotifications(page));
    };

    return (
        <>
            {(isNotificationLoading && !notifications.length) ? (
                <Spinner />
            ) : (
                (!isNotificationLoading && !notifications.length) ? (
                    <EmptyNotifications isNotification />
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
                                    <div style={{ flex: 1 }}>
                                        {tweetAuthors.slice(0, 6).map((tweetAuthor, index) => (
                                            <NotificationAuthorItem key={index} tweetAuthor={tweetAuthor} />
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
                        <InfiniteScrollWrapper
                            dataLength={notifications.length}
                            pagesCount={pagesCount}
                            loadItems={loadNotifications}
                        >
                            {notifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))}
                            {isNotificationLoading && <Spinner />}
                        </InfiniteScrollWrapper>
                    </>
                )
            )}
        </>
    );
};

export default NotificationsPage;
