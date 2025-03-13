import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { processUserToMuteList } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsUserMuted,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const UserUnmuteMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserMuted = useSelector(selectUserProfileIsUserMuted);
    const { t } = useTranslation();

    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({ userId: userProfileId! }));
        dispatch(setOpenSnackBar(isUserMuted
            ? t("UNMUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unmuted` })
            : t("MUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been muted` })
        ));
    };

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
