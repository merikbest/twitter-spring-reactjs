import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useEmptyNotificationsStyles } from "./EmptyNotificationsStyles";

interface EmptyNotificationsProps {
    isNotification: boolean;
}

const EmptyNotifications: FC<EmptyNotificationsProps> = ({ isNotification }): ReactElement => {
    const classes = useEmptyNotificationsStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.infoWindow}>
            <Typography variant={"h4"} component={"div"}>
                {t("NOTHING_TO_SEE", { defaultValue: "Nothing to see here — yet" })}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {isNotification ? (
                    t("EMPTY_NOTIFICATIONS_DESCRIPTION",
                        { defaultValue: "From like to Retweets and whole lot more, this is where all the actions happens." })
                ) : (
                    t("EMPTY_MENTIONS_DESCRIPTION",
                        { defaultValue: "When someone mentions you, you’ll find it here." })
                )}
            </Typography>
        </div>
    );
};

export default EmptyNotifications;
