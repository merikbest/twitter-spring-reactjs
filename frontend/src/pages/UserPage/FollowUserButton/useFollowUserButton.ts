import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { followUser, processFollowRequest } from "../../../store/ducks/user/actionCreators";
import { selectUserProfileId, selectUserProfileIsPrivateProfile } from "../../../store/ducks/userProfile/selectors";

export const useFollowUserButton = () => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);

    const handleFollow = useCallback((): void => {
        if (isPrivateProfile) {
            dispatch(processFollowRequest(userProfileId!));
        } else {
            dispatch(followUser({ userId: userProfileId! }));
        }
    }, [dispatch, userProfileId, isPrivateProfile]);

    return { handleFollow };
};