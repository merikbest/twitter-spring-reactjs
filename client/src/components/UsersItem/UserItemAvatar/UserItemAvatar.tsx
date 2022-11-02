import React, {FC, memo, ReactElement} from "react";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";

import {useGlobalStyles} from "../../../util/globalClasses";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {Image} from "../../../store/types/common";

interface UserItemAvatarProps {
    userAvatar?: Image;
}

const UserItemAvatar: FC<UserItemAvatarProps> = memo(({userAvatar}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const avatar = userAvatar ? userAvatar.src : DEFAULT_PROFILE_IMG;

    return (
        <ListItemAvatar>
            <Avatar className={globalClasses.avatar} alt={"avatar"} src={avatar}/>
        </ListItemAvatar>
    );
});

export default UserItemAvatar;
