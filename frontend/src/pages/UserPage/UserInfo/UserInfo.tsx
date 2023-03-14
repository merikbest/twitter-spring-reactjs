import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { Typography } from "@material-ui/core";

import { LockIcon } from "../../../icons";
import {
    selectUserProfileAbout,
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const UserInfo = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const userProfileId = useSelector(selectUserProfileId);
    const fullName = useSelector(selectUserProfileFullName);
    const username = useSelector(selectUserProfileUsername);
    const about = useSelector(selectUserProfileAbout);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isMyProfileBlocked = useSelector(selectUserProfileIsMyProfileBlocked);

    return (
        <>
            {!userProfileId ? (
                <Skeleton variant="text" width={250} height={30} />
            ) : (
                <div>
                    <Typography variant={"h5"} component={"span"}>
                        {fullName}
                    </Typography>
                    {isPrivateProfile && <span className={classes.lockIcon}>{LockIcon}</span>}
                </div>
            )}
            {!userProfileId ? (
                <Skeleton variant="text" width={60} />
            ) : (
                <Typography variant={"subtitle1"} component={"div"}>
                    @{username}
                </Typography>
            )}
            {!isMyProfileBlocked && (
                <Typography variant={"body1"} component={"div"} className={classes.description}>
                    {about}
                </Typography>
            )}
        </>
    );
});

export default UserInfo;
