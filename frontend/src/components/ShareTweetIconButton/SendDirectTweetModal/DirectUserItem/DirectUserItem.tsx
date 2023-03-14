import React, { FC, memo, ReactElement } from "react";
import { Avatar, ListItem, Typography } from "@material-ui/core";

import { useDirectUserItemStyles } from "./DirectUserItemStyles";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { CheckIcon } from "../../../../icons";
import { UserResponse } from "../../../../types/user";
import LockIcon from "../../../LockIcon/LockIcon";

interface DirectUserItemProps {
    user: UserResponse;
    userFromChat?: boolean;
    myProfileId: number;
    selected: boolean;
    handleListItemClick: (user: UserResponse) => void;
}

const DirectUserItem: FC<DirectUserItemProps> = memo((
    {
        user,
        userFromChat,
        myProfileId,
        selected,
        handleListItemClick
    }
): ReactElement => {
    const classes = useDirectUserItemStyles();
    const userAvatar = user?.avatar ?? DEFAULT_PROFILE_IMG;

    return (
        <ListItem
            button
            disabled={
                (user.isMutedDirectMessages && !userFromChat) ||
                user.isUserBlocked ||
                user.isMyProfileBlocked ||
                user.id === myProfileId
            }
            selected={selected}
            onClick={() => handleListItemClick(user)}
        >
            <div className={classes.container}>
                <Avatar className={classes.listAvatar} src={userAvatar} />
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
                        {selected && <span className={classes.checkIcon}>{CheckIcon}</span>}
                    </div>
                </div>
            </div>
        </ListItem>
    );
});

export default DirectUserItem;
