import React, { FC, memo, ReactElement } from "react";
import { Avatar, Typography } from "@material-ui/core";

import { useMessagesModalUserStyles } from "./MessagesModalUserStyles";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import LockIcon from "../../../../components/LockIcon/LockIcon";
import { UserResponse } from "../../../../types/user";

interface MessagesModalUser {
    user: UserResponse;
}

const MessagesModalUser: FC<MessagesModalUser> = memo(({ user }): ReactElement => {
    const classes = useMessagesModalUserStyles({ mutedDirectMessages: user?.isMutedDirectMessages });

    return (
        <div className={classes.container}>
            <Avatar className={classes.listAvatar} src={user?.avatar ?? DEFAULT_PROFILE_IMG} />
            <div style={{ flex: 1 }}>
                <div className={classes.header}>
                    <div className={classes.headerInfo}>
                        <div>
                            <Typography variant={"h6"} component={"span"}>
                                {user?.fullName}
                            </Typography>
                            {user?.isPrivateProfile && <LockIcon />}
                        </div>
                        <Typography variant={"subtitle1"} component={"div"}>
                            @{user?.username}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MessagesModalUser;
