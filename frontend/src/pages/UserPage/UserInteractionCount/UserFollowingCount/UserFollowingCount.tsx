import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";

import { selectUserDataId, selectUserFollowingCount } from "../../../../store/ducks/user/selectors";
import { selectUserProfileFollowingCount, selectUserProfileId } from "../../../../store/ducks/userProfile/selectors";

const UserFollowingCount = memo((): ReactElement => {
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const myProfileFollowingSize = useSelector(selectUserFollowingCount);
    const userProfileFollowingSize = useSelector(selectUserProfileFollowingCount);

    return (
        <ListItem>
            <Typography variant={"h6"} component={"span"}>
                {(userProfileId === myProfileId) ? (
                    myProfileFollowingSize
                ) : (
                    userProfileFollowingSize
                )}
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {" Followers"}
            </Typography>
        </ListItem>
    );
});

export default UserFollowingCount;
