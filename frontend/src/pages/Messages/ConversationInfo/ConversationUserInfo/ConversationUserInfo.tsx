import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import LockIcon from "../../../../components/LockIcon/LockIcon";

interface ConversationUserInfoProps {
    username?: string;
    fullName?: string;
    isPrivateProfile?: boolean;
}

const ConversationUserInfo: FC<ConversationUserInfoProps> = memo((
    {
        username,
        fullName,
        isPrivateProfile
    }
): ReactElement => {
    return (
        <div>
            <Typography variant={"h6"} component={"span"}>
                {fullName}
            </Typography>
            {isPrivateProfile && <LockIcon />}
            <Typography variant={"subtitle1"} component={"div"}>
                @{username}
            </Typography>
        </div>
    );
});

export default ConversationUserInfo;
