import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { processUserToMuteList } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsUserMuted,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";

export const useUserUnmuteMessage = () => {
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

    return { userProfileId, username, isUserMuted, onMuteUser };
};
