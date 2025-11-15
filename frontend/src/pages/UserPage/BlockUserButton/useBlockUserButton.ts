import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    selectUserProfileId,
    selectUserProfileIsUserBlocked,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import { processUserToBlocklist } from "../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";

export const useBlockUserButton = (onCloseModalWindow: () => void) => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("BLOCKED", { defaultValue: "Blocked" }));

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({ userId: userProfileId! }));
        onCloseModalWindow();
        setBtnText(isUserBlocked
            ? t("FOLLOWING", { defaultValue: "Following" })
            : t("BLOCKED", { defaultValue: "Blocked" }));
        dispatch(setOpenSnackBar(isUserBlocked
            ? t("UNBLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unblocked` })
            : t("BLOCK_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been blocked` })));
    };

    const onMouseOver = (): void => {
        setBtnText(t("UNBLOCK", { defaultValue: "Unblock" }));
    };

    const onMouseLeave = (): void => {
        setBtnText(t("BLOCKED", { defaultValue: "Blocked" }));
    };

    return { btnText, username, isUserBlocked, onBlockUser, onMouseOver, onMouseLeave };
};
