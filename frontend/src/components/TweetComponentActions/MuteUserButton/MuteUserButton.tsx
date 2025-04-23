import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { MuteIcon, UnmuteIcon } from "../../../icons";
import { processUserToMuteList } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectTweetInfoUserId,
    selectTweetInfoUserIsUserMuted,
    selectTweetInfoUserUsername
} from "../../../store/ducks/tweetAdditionalInfo/selectors";

interface MuteUserButtonProps {
    tweetId: number;
}

const MuteUserButton: FC<MuteUserButtonProps> = memo(({ tweetId }): ReactElement => {
    const dispatch = useDispatch();
    const userId = useSelector(selectTweetInfoUserId);
    const username = useSelector(selectTweetInfoUserUsername);
    const isUserMuted = useSelector(selectTweetInfoUserIsUserMuted);
    const { t } = useTranslation();

    const onMuteUser = (): void => {
        dispatch(processUserToMuteList({ userId: userId!, tweetId }));
        dispatch(setOpenSnackBar(isUserMuted
            ? t("UNMUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unmuted.` })
            : t("MUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been muted.` })));
    };

    return (
        <ListItem id="onMuteUser" onClick={onMuteUser}>
            <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
            <Typography variant="body1" component="span">
                {isUserMuted
                    ? t("UNMUTE_USER", { username, defaultValue: `Unmute @${username}` })
                    : t("MUTE_USER", { username, defaultValue: `Mute @${username}` })}
            </Typography>
        </ListItem>
    );
});

export default MuteUserButton;
