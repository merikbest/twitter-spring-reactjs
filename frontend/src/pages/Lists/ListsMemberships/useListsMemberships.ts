import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchUserProfile } from "../../../store/ducks/userProfile/actionCreators";
import { selectUserProfile, selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { fetchUserListsById, resetListsState } from "../../../store/ducks/lists/actionCreators";
import { selectIsLoading, selectUserListsItems } from "../../../store/ducks/lists/selectors";

export const useListsMemberships = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const lists = useSelector(selectUserListsItems);
    const isListsLoading = useSelector(selectIsLoading);
    const myProfileId = useSelector(selectUserDataId);
    const userProfile = useSelector(selectUserProfile);
    const isUserProfileLoaded = useSelector(selectUsersIsSuccessLoaded);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(Number(params.id)));

        return () => {
            dispatch(resetListsState());
        };
    }, [params]);

    useEffect(() => {
        if (isUserProfileLoaded && userProfile) {
            if ((userProfile.isPrivateProfile && !userProfile.isFollower) || userProfile.isMyProfileBlocked) {
                history.push(`/profile/${userProfile.id}`);
            } else {
                dispatch(fetchUserListsById(Number(params.id)));
            }
        }
    }, [isUserProfileLoaded]);

    return { lists, isListsLoading, myProfileId, userProfile };
};
