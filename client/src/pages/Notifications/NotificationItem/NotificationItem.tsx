import React, {FC, ReactElement} from 'react';
import {Avatar, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";

import {useNotificationItemStyles} from "./NotificationItemStyles";
import {NotificationResponse} from "../../../store/types/notification";
import {NotificationType} from "../../../store/ducks/notifications/contracts/state";
import {LikeIcon, ProfileIconFilled, RetweetIcon} from "../../../icons";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import PopperUserWindow from "../../../components/PopperUserWindow/PopperUserWindow";
import {textFormatter} from "../../../util/textFormatter";
import {HoverUserProps, withHoverUser} from "../../../hoc/withHoverUser";

export interface NotificationItemProps {
    notification: NotificationResponse;
    handleClickUser: (userId: number, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NotificationItem: FC<NotificationItemProps & HoverUserProps> = (
    {
        notification,
        handleClickUser,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const classes = useNotificationItemStyles();

    return (
        <Link to={notification.notificationType !== NotificationType.FOLLOW
                ? `/notification/${notification.id}`
                : `/profile/${notification.user.id}`}
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
                </div>
                <div style={{flex: 1}}>
                    <a href={`/profile/${notification.user.id!}`}
                       onClick={event => handleClickUser(notification.user.id!, event)}
                       onMouseEnter={() => handleHoverPopper!(notification.user.id!)}
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
                        <PopperUserWindow visible={visiblePopperWindow}/>
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
        </Link>
    );
};

export default withHoverUser(NotificationItem);
