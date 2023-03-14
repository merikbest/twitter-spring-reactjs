import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import LockIcon from "../../../../../../../components/LockIcon/LockIcon";

interface MemberItemInfoProps {
    fullName?: string;
    username?: string;
    isPrivateProfile?: boolean;
    about?: string;
}

const MemberItemInfo: FC<MemberItemInfoProps> = memo((
    {
        fullName,
        username,
        isPrivateProfile,
        about
    }
): ReactElement => {
    return (
        <>
            <Typography variant={"h6"} component={"span"}>
                {fullName}
            </Typography>
            {isPrivateProfile && <LockIcon />}
            <Typography variant={"subtitle1"} component={"div"}>
                @{username}
            </Typography>
            <Typography variant={"body1"} component={"div"}>
                {about}
            </Typography>
        </>
    );
});

export default MemberItemInfo;
