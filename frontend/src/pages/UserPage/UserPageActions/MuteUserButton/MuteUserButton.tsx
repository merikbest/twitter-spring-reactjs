import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { MuteIcon, UnmuteIcon } from "../../../../icons";
import { processUserToMuteList } from "../../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsUserMuted,
    selectUserProfileUsername
} from "../../../../store/ducks/userProfile/selectors";

interface MuteUserButtonProps {
    onCloseUserPageActions: () => void;
}

const MuteUserButton: FC<MuteUserButtonProps> = memo(({ onCloseUserPageActions }): ReactElement => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserMuted = useSelector(selectUserProfileIsUserMuted);
    const { t } = useTranslation();

    const handleMuteUser = (): void => {
        dispatch(processUserToMuteList({ userId: userProfileId! }));
        dispatch(setOpenSnackBar(isUserMuted
            ? t("UNMUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unmuted` })
            : t("MUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been muted` })));
        onCloseUserPageActions();
    };

    return (
        <ListItem id="handleMuteUser" onClick={handleMuteUser}>
            <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
            <Typography component="span">
                {isUserMuted
                    ? t("UNMUTE_USER", { username, defaultValue: `Unmute @${username}` })
                    : t("MUTE_USER", { username, defaultValue: `Mute @${username}` })}
            </Typography>
        </ListItem>
    );
});

export default MuteUserButton;
