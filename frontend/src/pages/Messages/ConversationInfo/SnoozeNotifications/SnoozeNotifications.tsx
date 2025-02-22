import React, { FC, memo, ReactElement } from "react";
import { Switch, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../util/globalClasses";
import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface SnoozeNotificationsProps {
    fullName?: string;
}

const SnoozeNotifications: FC<SnoozeNotificationsProps> = memo(({ fullName }): ReactElement => {
    const { t } = useTranslation();
    const globalClasses = useGlobalStyles({});
    const classes = useConversationInfoStyles();

    return (
        <div className={globalClasses.itemInfoWrapper}>
            <Typography variant={"h5"} component={"div"}>
                {t("NOTIFICATIONS", { defaultValue: "Notifications" })}
            </Typography>
            <div className={classes.switchWrapper}>
                <Typography variant={"body1"} component={"span"}>
                    {t("SNOOZE_NOTIFICATIONS", { fullName, defaultValue: `Snooze notifications from ${fullName}` })}
                </Typography>
                <Switch checked={false} />
            </div>
        </div>
    );
});

export default SnoozeNotifications;
