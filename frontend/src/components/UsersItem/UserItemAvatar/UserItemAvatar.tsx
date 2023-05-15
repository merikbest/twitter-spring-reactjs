import React, { FC, memo, ReactElement } from "react";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";

import { useGlobalStyles } from "../../../util/globalClasses";

interface UserItemAvatarProps {
    avatar?: string;
}

const UserItemAvatar: FC<UserItemAvatarProps> = memo(({ avatar }): ReactElement => {
    const globalClasses = useGlobalStyles({});

    return (
        <ListItemAvatar>
            <Avatar className={globalClasses.avatar} alt={"avatar"} src={avatar} />
        </ListItemAvatar>
    );
});

export default UserItemAvatar;
