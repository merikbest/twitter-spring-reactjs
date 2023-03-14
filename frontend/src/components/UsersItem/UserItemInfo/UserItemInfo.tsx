import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import LockIcon from "../../LockIcon/LockIcon";
import { UserItemSize } from "../UsersItem";

interface UserItemInfoProps {
    fullName?: string;
    username?: string;
    about?: string;
    isPrivateProfile?: boolean;
    isMyProfileBlocked?: boolean;
    size?: UserItemSize;
}

const UserItemInfo: FC<UserItemInfoProps> = memo((
    {
        fullName,
        username,
        about,
        isPrivateProfile,
        isMyProfileBlocked,
        size
    }
): ReactElement => {
    return (
        <>
            <Typography variant={"h6"} display={"inline"}>
                {fullName}
            </Typography>
            {isPrivateProfile && <LockIcon />}
            <Typography variant={"subtitle1"} component={"div"}>
                @{username}
            </Typography>
            {!isMyProfileBlocked && (
                (size !== UserItemSize.SMALL) && (
                    <Typography variant={"body1"} display="block">
                        {about}
                    </Typography>
                )
            )}
        </>
    );
});

export default UserItemInfo;
