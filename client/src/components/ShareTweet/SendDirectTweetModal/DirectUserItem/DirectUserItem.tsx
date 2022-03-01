import React, {FC, ReactElement} from 'react';
import {Avatar, Typography} from "@material-ui/core";

import {useDirectUserItemStyles} from "./DirectUserItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {CheckIcon, LockIcon} from "../../../../icons";
import {UserResponse} from "../../../../store/types/user";

interface DirectUserItemProps {
    user: UserResponse;
    selected: boolean;
}

const DirectUserItem: FC<DirectUserItemProps> = ({user, selected}): ReactElement => {
    const classes = useDirectUserItemStyles();

    return (
        <div className={classes.container}>
            <Avatar
                className={classes.listAvatar}
                src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
            />
            <div style={{flex: 1}}>
                <div className={classes.header}>
                    <div className={classes.headerInfo}>
                        <div>
                            <Typography variant={"h6"} component={"span"}>
                                {user?.fullName}
                            </Typography>
                            {user?.isPrivateProfile && (
                                <span className={classes.lockIcon}>
                                    {LockIcon}
                                </span>
                            )}
                        </div>
                        <Typography variant={"subtitle1"} component={"div"}>
                            @{user?.username}
                        </Typography>
                    </div>
                    {selected && <span className={classes.checkIcon}>{CheckIcon}</span>}
                </div>
            </div>
        </div>
    );
};

export default DirectUserItem;
