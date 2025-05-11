import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { selectUserDataId } from "../../store/ducks/user/selectors";
import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile,
    selectUserProfileUsername,
    selectUsersIsSuccessLoaded
} from "../../store/ducks/userProfile/selectors";
import { fetchUserProfile, resetUserProfileState } from "../../store/ducks/userProfile/actionCreators";
import { fetchFollowers, fetchFollowings, resetUsersState } from "../../store/ducks/usersSearch/actionCreators";
import { PROFILE, USER } from "../../constants/path-constants";
import { selectFollowers, selectUsersSearchIsLoading } from "../../store/ducks/usersSearch/selectors";

export const useFollowingFollowers = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams<{ id: string, follow: string }>();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const fullName = useSelector(selectUserProfileFullName);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isFollower = useSelector(selectUserProfileIsFollower);
    const isMyProfileBlocked = useSelector(selectUserProfileIsMyProfileBlocked);
    const isUserProfileLoaded = useSelector(selectUsersIsSuccessLoaded);
    const users = useSelector(selectFollowers);
    const isUsersLoading = useSelector(selectUsersSearchIsLoading);
    const [activeTab, setActiveTab] = useState(0);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        if (newValue) {
            history.push(`${USER}/${userProfileId}/followers`);
            fetchUsers(1);
        } else {
            history.push(`${USER}/${userProfileId}/following`);
            fetchUsers(0);
        }
    };

    const fetchUsers = (activeTabIndex: number): void => {
        document.title = `People ${activeTabIndex ? "following" : "followed"} by ${fullName} (@${username}) / Twitter`;
        setActiveTab(activeTabIndex);
        const user = { userId: params.id, page: 0 };
        dispatch(resetUsersState());
        if (activeTabIndex === 0) {
            dispatch(fetchFollowings(user));
        }
        if (activeTabIndex === 1) {
            dispatch(fetchFollowers(user));
        }
    };

    useEffect(() => {
        dispatch(fetchUserProfile(parseInt(params.id)));

        return () => {
            dispatch(resetUsersState());
            dispatch(resetUserProfileState());
        };
    }, [params]);

    useEffect(() => {
        if (isUserProfileLoaded && userProfileId) {
            if ((isPrivateProfile && !isFollower && userProfileId !== myProfileId) || isMyProfileBlocked) {
                history.push(`${PROFILE}/${userProfileId}`);
            } else {
                if (params.follow === "following") {
                    fetchUsers(0);
                } else {
                    fetchUsers(1);
                }
            }
        }
    }, [isUserProfileLoaded]);

    return { users, isUsersLoading, activeTab, handleChangeTab };
};
