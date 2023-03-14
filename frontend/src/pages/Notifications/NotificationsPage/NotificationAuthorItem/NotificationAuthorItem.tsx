import React, { FC, memo, ReactElement } from "react";
import { Avatar } from "@material-ui/core";

import { useNotificationAuthorItemStyles } from "./NotificationAuthorItemStyles";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { NotificationUserResponse } from "../../../../types/notification";
import PopperUserWindow from "../../../../components/PopperUserWindow/PopperUserWindow";
import { useHoverUser } from "../../../../hook/useHoverUser";

interface NotificationAuthorItemProps {
    tweetAuthor: NotificationUserResponse;
}

const NotificationAuthorItem: FC<NotificationAuthorItemProps> = memo(({ tweetAuthor }): ReactElement => {
    const classes = useNotificationAuthorItemStyles();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverUser();

    return (
        <div
            className={classes.notificationAvatarWrapper}
            onMouseEnter={() => handleHoverPopper(tweetAuthor?.id!)}
            onMouseLeave={handleLeavePopper}
        >
            <Avatar
                className={classes.notificationAvatar}
                alt={`avatar ${tweetAuthor?.id!}`}
                src={tweetAuthor?.avatar ?? DEFAULT_PROFILE_IMG}
            />
            <PopperUserWindow visible={visiblePopperWindow} />
        </div>
    );
});

export default NotificationAuthorItem;
