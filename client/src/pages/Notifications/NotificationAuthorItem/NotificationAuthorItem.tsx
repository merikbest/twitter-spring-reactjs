import React, {FC, ReactElement} from 'react';
import {Avatar} from "@material-ui/core";

import {useNotificationAuthorItemStyles} from "./NotificationAuthorItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {NotificationUserResponse} from "../../../store/types/notification";
import {HoverUserProps, withHoverUser} from "../../../hoc/withHoverUser";
import PopperUserWindow from "../../../components/PopperUserWindow/PopperUserWindow";

interface NotificationAuthorItemProps {
    tweetAuthor: NotificationUserResponse;
}

const NotificationAuthorItem: FC<NotificationAuthorItemProps & HoverUserProps> = (
    {
        tweetAuthor,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const classes = useNotificationAuthorItemStyles();

    return (
        <div
            key={tweetAuthor.id}
            className={classes.notificationAvatarWrapper}
            onMouseEnter={() => handleHoverPopper!(tweetAuthor?.id!)}
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
            <PopperUserWindow visible={visiblePopperWindow}/>
        </div>
    );
};

export default withHoverUser(NotificationAuthorItem);
