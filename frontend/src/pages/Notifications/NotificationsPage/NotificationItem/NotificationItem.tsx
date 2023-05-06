import React, { FC, memo, ReactElement } from "react";
import { Avatar, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);
    const avatar = notification.user.avatar ?? DEFAULT_PROFILE_IMG;

    return (
        <LinkWrapper
            path={(
                notification.notificationType === NotificationType.FOLLOW
            ) ? (
                `${PROFILE}/${notification.user.id}`
            ) : (
                (notification.notificationType === NotificationType.LISTS
                ) ? (
                    `${LISTS}/${notification.list.id}`
                ) : (
                    `${NOTIFICATION}/${notification.id}`
                )
            )}
            visiblePopperWindow={visiblePopperWindow}
        >
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
                    {(notification.notificationType === NotificationType.LISTS) && (
                        <span id={"list"}>{ListsIconFilled}</span>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <LinkWrapper path={`${PROFILE}/${notification.user.id!}`} visiblePopperWindow={visiblePopperWindow}>
                        <div
                            id={"userInfo"}
                            onMouseEnter={() => handleHoverPopper({ userId: notification.user.id } as HoverItemDetail)}
                            onMouseLeave={handleLeavePopper}
                        >
                            <Avatar className={classes.notificationAvatar} src={avatar} alt={avatar} />
                            <PopperUserWindow visible={visiblePopperWindow} />
                        </div>
                    </LinkWrapper>
                    <div className={classes.notificationInfo}>
                        <Typography variant={"h6"} component={"span"}>
                            {`${notification.user.username} `}
                        </Typography>
                        <Typography variant={"body1"} component={"span"}>
                            {(notification.notificationType === NotificationType.FOLLOW) ? (
                                <>followed you</>
                            ) : (
                                (notification.notificationType === NotificationType.LISTS) ? (
                                    <>
                                        {"added you to their List "}
                                        <Typography variant={"h6"} component={"span"}>
                                            {notification.list.name}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        {(notification.notificationType === NotificationType.LIKE) ? (
                                            "liked"
                                        ) : (
                                            "Retweeted"
                                        )} your Tweet
                                    </>
                                )
                            )}
                        </Typography>
                    </div>
                    <Typography variant={"body1"} component={"div"} className={classes.notificationText}>
                        {notification.tweet && textFormatter(notification.tweet.text)}
                    </Typography>
                </div>
            </Paper>
        </LinkWrapper>
    );
});

export default NotificationItem;
