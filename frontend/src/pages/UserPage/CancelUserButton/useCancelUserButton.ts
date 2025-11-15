import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { processFollowRequest } from "../../../store/ducks/user/actionCreators";
import { selectUserProfileId } from "../../../store/ducks/userProfile/selectors";

export const useCancelUserButton = () => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState(t("PENDING", { defaultValue: "Pending" }));

    const cancelFollow = (): void => {
        dispatch(processFollowRequest(userProfileId!));
    };

    const onMouseOver = (): void => {
        setBtnText(t("CANCEL", { defaultValue: "Cancel" }));
    };

    const onMouseLeave = (): void => {
        setBtnText(t("PENDING", { defaultValue: "Pending" }));
    };

    return { btnText, cancelFollow, onMouseOver, onMouseLeave };
};
