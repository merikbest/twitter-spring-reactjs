import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import FollowerGroup from "../../../components/FollowerGroup/FollowerGroup";
import {
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile,
    selectUserProfileSameFollowers
} from "../../../store/ducks/userProfile/selectors";

const UserFollowerGroup = memo((): ReactElement => {
    const userProfileId = useSelector(selectUserProfileId);
    const isMyProfileBlocked = useSelector(selectUserProfileIsMyProfileBlocked);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const sameFollowers = useSelector(selectUserProfileSameFollowers);
    const isFollower = useSelector(selectUserProfileIsFollower);

    return (
        <>
            {userProfileId && !isMyProfileBlocked && (!isPrivateProfile || isFollower) && (
                <FollowerGroup userId={userProfileId} sameFollowers={sameFollowers} />
            )}
        </>
    );
});

export default UserFollowerGroup;
