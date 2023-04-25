import React, { FC, memo, ReactElement } from "react";
import { Avatar } from "@material-ui/core";

import { DEFAULT_PROFILE_IMG } from "../../../../../../constants/url-constants";
import { useFollowerRequestsItemStyles } from "../FollowerRequestsItemStyles";

interface UserRequestsAvatarProps {
    avatar?: string;
}

const UserRequestsAvatar: FC<UserRequestsAvatarProps> = memo(({ avatar }): ReactElement => {
    const classes = useFollowerRequestsItemStyles();

    return <Avatar className={classes.listAvatar} src={avatar ?? DEFAULT_PROFILE_IMG} />;
});

export default UserRequestsAvatar;
