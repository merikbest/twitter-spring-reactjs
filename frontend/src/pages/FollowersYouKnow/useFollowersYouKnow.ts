import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchUserProfile } from "../../store/ducks/userProfile/actionCreators";
import { selectUserProfile } from "../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { PROFILE, USER } from "../../constants/path-constants";
import { UserResponse } from "../../types/user";
import { FollowerUserApi } from "../../services/api/user-service/followerUserApi";

export const useFollowersYouKnow = () => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const history = useHistory();
    const userProfile = useSelector(selectUserProfile);
    const myProfileId = useSelector(selectUserDataId);
    const [overallFollowers, setOverallFollowers] = useState<UserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchUserProfile(parseInt(params.id)));
        setOverallFollowers([]);
        setIsLoading(true);
        FollowerUserApi.overallFollowers(params.id)
            .then(response => {
                setOverallFollowers(response.data);
                setIsLoading(false);
            });
    }, [params.id, dispatch]);

    useEffect(() => {
        if (userProfile?.isPrivateProfile) {
            history.push(`${PROFILE}/${params.id}`);
        }
    }, [userProfile, history, params.id]);

    useEffect(() => {
        if (parseInt(params.id) === myProfileId) {
            history.push(`${USER}/${myProfileId}/followers`);
        }
    }, [myProfileId, history, params.id]);

    return { overallFollowers, isLoading, userProfile };
};
