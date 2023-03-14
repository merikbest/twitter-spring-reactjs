import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { followUser, processFollowRequest } from "../../../store/ducks/user/actionCreators";
import { selectUserProfileId, selectUserProfileIsPrivateProfile } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const FollowUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);

    const handleFollow = (): void => {
        if (isPrivateProfile) {
            dispatch(processFollowRequest(userProfileId!));
        } else {
            dispatch(followUser({ userId: userProfileId! }));
        }
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={handleFollow}
            color="primary"
            variant="outlined"
            size="large"
        >
            Follow
        </Button>
    );
});

export default FollowUserButton;
