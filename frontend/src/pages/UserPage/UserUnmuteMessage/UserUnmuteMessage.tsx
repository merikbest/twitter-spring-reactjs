import React, { memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useUserPageStyles } from "../UserPageStyles";
import { useUserUnmuteMessage } from "./useUserUnmuteMessage";

const UserUnmuteMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const { t } = useTranslation();
    const { userProfileId, isUserMuted, onMuteUser } = useUserUnmuteMessage();

    return (
        <>
            {userProfileId && (
                isUserMuted && (
                    <Typography variant="subtitle1" component="div" className={classes.description}>
                        {t("USER_MUTE_DESCRIPTION", { defaultValue: "You have muted Tweets from this account." })}
                        {" "}
                        <Typography
                            id="unmuteUser"
                            className={classes.unfollowLink}
                            onClick={onMuteUser}
                            variant="subtitle1"
                            component="span"
                        >
                            {t("UNMUTE", { defaultValue: "Unmute" })}
                        </Typography>
                    </Typography>
                )
            )}
        </>
    );
});

export default UserUnmuteMessage;
