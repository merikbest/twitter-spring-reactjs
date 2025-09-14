import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchFollowedTopicsByUserId, resetTopicsState } from "../../store/ducks/topics/actionCreators";
import { selectFollowedTopicsItems, selectIsFollowedTopicsLoading } from "../../store/ducks/topics/selectors";
import { fetchUserProfile } from "../../store/ducks/userProfile/actionCreators";
import { selectUserProfile, selectUsersIsSuccessLoaded } from "../../store/ducks/userProfile/selectors";
import { PROFILE } from "../../constants/path-constants";

export const useUserTopics = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const userProfile = useSelector(selectUserProfile);
    const isUserProfileLoaded = useSelector(selectUsersIsSuccessLoaded);
    const followedTopics = useSelector(selectFollowedTopicsItems);
    const isFollowedTopicsLoading = useSelector(selectIsFollowedTopicsLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(Number(userId)));

        return () => {
            dispatch(resetTopicsState());
        };
    }, [userId, dispatch]);

    useEffect(() => {
        if (isUserProfileLoaded && userProfile) {
            if ((userProfile.isPrivateProfile && !userProfile.isFollower) || userProfile.isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfile.id}`);
            } else {
                dispatch(fetchFollowedTopicsByUserId(Number(userId)));
            }
        }
    }, [isUserProfileLoaded, userProfile, dispatch, history, userId]);

    return { followedTopics, isFollowedTopicsLoading };
};
