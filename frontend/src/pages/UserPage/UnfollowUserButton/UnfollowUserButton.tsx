import React, { memo, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { processFollowRequest, unfollowUser } from "../../../store/ducks/user/actionCreators";
import {
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsPrivateProfile
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const UnfollowUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isFollower = useSelector(selectUserProfileIsFollower);
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("FOLLOWING", { defaultValue: "Following" }));

    const handleFollow = (): void => {
        if (isPrivateProfile && !isFollower) {
            dispatch(processFollowRequest(userProfileId!));
        } else {
            dispatch(unfollowUser({ userId: userProfileId! }));
        }
    };

    return (
        <Button
            className={classes.primaryButton}
            onClick={handleFollow}
            onMouseOver={() => setBtnText(t("UNFOLLOW", { defaultValue: "Unfollow" }))}
            onMouseLeave={() => setBtnText(t("FOLLOWING", { defaultValue: "Following" }))}
            color="primary"
            variant="contained"
            size="large"
        >
            {btnText}
        </Button>
    );
});

export default UnfollowUserButton;
