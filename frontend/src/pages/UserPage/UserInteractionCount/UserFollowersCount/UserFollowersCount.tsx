import React, { memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { selectUserDataId, selectUserFollowersCount } from "../../../../store/ducks/user/selectors";
import { selectUserProfileFollowersCount, selectUserProfileId } from "../../../../store/ducks/userProfile/selectors";

const UserFollowersCount = memo((): ReactElement => {
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const myProfileFollowersSize = useSelector(selectUserFollowersCount);
    const userProfileFollowersSize = useSelector(selectUserProfileFollowersCount);

    return (
        <ListItem>
            <Typography variant={"h6"} component={"span"}>
                {(userProfileId === myProfileId) ? (
                    myProfileFollowersSize
                ) : (
                    userProfileFollowersSize
                )}
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {" Following"}
            </Typography>
        </ListItem>
    );
});

export default UserFollowersCount;
