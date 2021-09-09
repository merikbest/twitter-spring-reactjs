import React, {FC, ReactElement} from 'react';
import {Avatar, Typography} from "@material-ui/core";

import {useMessagesModalUserStyles} from "./MessagesModalUserStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {User} from "../../../../store/ducks/user/contracts/state";

interface MessagesModalUser {
    user: User;
}

const MessagesModalUser: FC<MessagesModalUser> = ({user}): ReactElement => {
    const classes = useMessagesModalUserStyles();

    return (
        <div className={classes.container}>
            <Avatar className={classes.listAvatar} src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}/>
            <div style={{flex: 1}}>
                <div className={classes.header}>
                    <div style={{width: 350}}>
                        <Typography className={classes.fullName}>
                            {user?.fullName}
                        </Typography>
                        <Typography className={classes.username} variant="caption" display="block" gutterBottom>
                            @{user?.username}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesModalUser;
