import React, { FC, memo, ReactElement } from "react";
import { Switch, Typography } from "@material-ui/core";

import { useGlobalStyles } from "../../../../util/globalClasses";
import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface SnoozeNotificationsProps {
    fullName?: string;
}

const SnoozeNotifications: FC<SnoozeNotificationsProps> = memo(({ fullName }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useConversationInfoStyles();

    return (
        <div className={globalClasses.itemInfoWrapper}>
            <Typography variant={"h5"} component={"div"}>
                Notifications
            </Typography>
            <div className={classes.switchWrapper}>
                <Typography variant={"body1"} component={"span"}>
                    {`Snooze notifications from ${fullName}`}
                </Typography>
                <Switch checked={false} />
            </div>
        </div>
    );
});

export default SnoozeNotifications;
