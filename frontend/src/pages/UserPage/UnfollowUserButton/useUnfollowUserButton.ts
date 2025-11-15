import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { processFollowRequest, unfollowUser } from "../../../store/ducks/user/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsPrivateProfile
} from "../../../store/ducks/userProfile/selectors";

export const useUnfollowUserButton = () => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isFollower = useSelector(selectUserProfileIsFollower);
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState(t("FOLLOWING", { defaultValue: "Following" }));

    const handleFollow = useCallback((): void => {
        if (isPrivateProfile && !isFollower) {
            dispatch(processFollowRequest(userProfileId!));
        } else {
            dispatch(unfollowUser({ userId: userProfileId! }));
        }
    }, [dispatch, userProfileId, isPrivateProfile, isFollower]);

    const onMouseOver = useCallback((): void => {
        setBtnText(t("UNFOLLOW", { defaultValue: "Unfollow" }));
    }, [t]);

    const onMouseLeave = useCallback((): void => {
        setBtnText(t("FOLLOWING", { defaultValue: "Following" }));
    }, [t]);

    return { btnText, handleFollow, onMouseOver, onMouseLeave };
};
