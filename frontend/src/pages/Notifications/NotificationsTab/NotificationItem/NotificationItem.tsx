import React, { FC, memo, ReactElement, useMemo } from "react";
import { Avatar, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";

import { useNotificationItemStyles } from "./NotificationItemStyles";
import { NotificationResponse } from "../../../../types/notification";
import { NotificationType } from "../../../../types/common";
import { LikeIcon, ListsIconFilled, ProfileIconFilled, RetweetIcon } from "../../../../icons";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import PopperUserWindow from "../../../../components/PopperUserWindow/PopperUserWindow";
import { textFormatter } from "../../../../util/text-formatter";
import { HoverItemDetail, useHoverItem } from "../../../../hook/useHoverItem";
import { LISTS, NOTIFICATION, PROFILE } from "../../../../constants/path-constants";
import LinkWrapper from "../../../../components/LinkWrapper/LinkWrapper";
import { fetchUserDetail } from "../../../../store/ducks/userDetail/actionCreators";

export interface NotificationItemProps {
    notification: NotificationResponse;
}

const NotificationItem: FC<NotificationItemProps> = memo(({ notification }): ReactElement => {
    const classes = useNotificationItemStyles();
    const { t } = useTranslation();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);
    const avatar = notification.user.avatar ?? DEFAULT_PROFILE_IMG;
    const notificationType = notification.notificationType;

    const getNotificationPath = useMemo(() => {
        switch (notification.notificationType) {
            case NotificationType.FOLLOW:
                return `${PROFILE}/${notification.user.id}`;
            case NotificationType.LISTS:
                return `${LISTS}/${notification.list.id}`;
            default:
                return `${NOTIFICATION}/${notification.id}`;
        }
    }, [notificationType, notification]);

    const renderNotificationIcon = useMemo(() => {
        switch (notificationType) {
            case NotificationType.LIKE:
                return <span id="like">{LikeIcon}</span>;
            case NotificationType.RETWEET:
                return <span id="retweet">{RetweetIcon}</span>;
            case NotificationType.FOLLOW:
                return <span id="follow">{ProfileIconFilled}</span>;
            case NotificationType.LISTS:
                return <span id="list">{ListsIconFilled}</span>;
            default:
                return null;
        }
    }, [notificationType]);

    return (
        <LinkWrapper path={getNotificationPath} visiblePopperWindow={visiblePopperWindow}>
            <Paper className={classes.notificationWrapper} variant="outlined">
                <div className={classes.notificationIcon}>
                    {renderNotificationIcon}
                </div>
                <div style={{ flex: 1 }}>
                    <LinkWrapper path={`${PROFILE}/${notification.user.id!}`} visiblePopperWindow={visiblePopperWindow}>
                        <div
                            id="userInfo"
                            onMouseEnter={() => handleHoverPopper({ userId: notification.user.id } as HoverItemDetail)}
                            onMouseLeave={handleLeavePopper}
                        >
                            <Avatar className={classes.notificationAvatar} src={avatar} alt={avatar} />
                            <PopperUserWindow visible={visiblePopperWindow} />
                        </div>
                    </LinkWrapper>
                    <div className={classes.notificationInfo}>
                        <Typography variant="h6" component="span">
                            {`${notification.user.username} `}
                        </Typography>
                        <Typography variant="body1" component="span">
                            {(notification.notificationType === NotificationType.FOLLOW) ? (
                                t("FOLLOWED_YOU", { defaultValue: "followed you" })
                            ) : (
                                (notification.notificationType === NotificationType.LISTS) ? (
                                    <>
                                        {t("ADDED_TO_LIST", { defaultValue: "added you to their List" })}
                                        {" "}
                                        <Typography variant="h6" component="span">
                                            {notification.list.name}
                                        </Typography>
                                    </>
                                ) : (
                                    (notification.notificationType === NotificationType.LIKE) ? (
                                        t("LIKED_YOUR_TWEET", { defaultValue: "liked your Tweet" })
                                    ) : (
                                        t("RETWEETED_YOUR_TWEET", { defaultValue: "Retweeted your Tweet" })
                                    )
                                )
                            )}
                        </Typography>
                    </div>
                    <Typography variant="body1" component="div" className={classes.notificationText}>
                        {notification.tweet && textFormatter(notification.tweet.text)}
                    </Typography>
                </div>
            </Paper>
        </LinkWrapper>
    );
});

export default NotificationItem;
