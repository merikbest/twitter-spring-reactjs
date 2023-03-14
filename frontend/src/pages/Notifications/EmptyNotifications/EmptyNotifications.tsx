import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useEmptyNotificationsStyles } from "./EmptyNotificationsStyles";

interface EmptyNotificationsProps {
    isNotification: boolean;
}

const EmptyNotifications: FC<EmptyNotificationsProps> = ({ isNotification }): ReactElement => {
    const classes = useEmptyNotificationsStyles();

    return (
        <div className={classes.infoWindow}>
            <Typography variant={"h4"} component={"div"}>
                Nothing to see here — yet
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {isNotification ? (
                    "From like to Retweets and whole lot more, this is where all the actions happens."
                ) : (
                    "When someone mentions you, you’ll find it here."
                )}
            </Typography>
        </div>
    );
};

export default EmptyNotifications;
