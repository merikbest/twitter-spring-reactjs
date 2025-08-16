import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Spinner from "../../../components/Spinner/Spinner";
import { NOTIFICATIONS_TIMELINE } from "../../../constants/path-constants";
import { NotificationsIconFilled } from "../../../icons";
import NotificationAuthorItem from "./NotificationAuthorItem";
import NotificationItem from "./NotificationItem";
import { useNotificationsTabStyles } from "./NotificationsTabStyles";
import EmptyNotifications from "../EmptyNotifications";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import { useNotificationsTab } from "./useNotificationsTab";

const NotificationsTab: FC = (): ReactElement => {
    const classes = useNotificationsTabStyles();
    const { t } = useTranslation();
    const {
        notifications,
        isNotificationLoading,
        tweetAuthors,
        numberOfPeople,
        pagesCount,
        loadNotifications
    } = useNotificationsTab();

    if (isNotificationLoading && !notifications.length) {
        return <Spinner />;
    }

    if (!isNotificationLoading && !notifications.length) {
        return <EmptyNotifications isNotification />;
    }

    return (
        <>
            {(tweetAuthors.length !== 0) && (
                <Link to={NOTIFICATIONS_TIMELINE}>
                    <Paper className={classes.notificationWrapper} variant="outlined">
                        <div className={classes.notificationIcon}>
                            <span id="notification">
                                {NotificationsIconFilled}
                            </span>
                        </div>
                        <div style={{ flex: 1 }}>
                            {tweetAuthors.slice(0, 6).map((tweetAuthor, index) => (
                                <NotificationAuthorItem key={index} tweetAuthor={tweetAuthor} />
                            ))}
                            <Typography className={classes.notificationInfoText} variant="body1" component="div">
                                {t("NEW_TWEET_NOTIFICATIONS", { defaultValue: "New Tweet notifications for" })}
                                {" "}
                                <Typography variant="h6" component="span">
                                    {tweetAuthors[0].username}
                                </Typography>
                                {(tweetAuthors.length > 2) ? (
                                    ` ${t("AND_OTHERS", {
                                        numberOfPeople,
                                        defaultValue: ` and ${numberOfPeople} others` })
                                    }`
                                ) : (
                                    (tweetAuthors.length === 2) && (
                                        <>
                                            <Typography
                                                variant="body1"
                                                component="span"
                                                className={classes.notificationInfoText}
                                            >
                                                {` ${t("AND", { defaultValue: "and" })} `}
                                            </Typography>
                                            <Typography variant="h6" component="span">
                                                {tweetAuthors[1].username}
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
    );
};

export default NotificationsTab;
