import React, {FC, memo, ReactElement} from "react";
import {Avatar} from "@material-ui/core";

import {DEFAULT_PROFILE_IMG} from "../../../../../util/url";
import {useFollowerRequestsItemStyles} from "../FollowerRequestsItemStyles";
import {Image} from "../../../../../store/types/common";

interface UserRequestsAvatarProps {
    avatar: Image;
}

const UserRequestsAvatar: FC<UserRequestsAvatarProps> = memo(({avatar}): ReactElement => {
    const classes = useFollowerRequestsItemStyles();

    return <Avatar className={classes.listAvatar} src={avatar ? avatar.src : DEFAULT_PROFILE_IMG}/>;
});

export default UserRequestsAvatar;
