import React, { FC, memo, ReactElement } from "react";
import { Paper } from "@material-ui/core";

import { useMutedAccountItemStyles } from "./MutedAccountItemStyles";
import { MutedUserResponse } from "../../../../../../types/user";
import MuteAccountButton from "./MuteAccountButton/MuteAccountButton";
import MuteAccountInfo from "./MuteAccountInfo/MuteAccountInfo";
import MuteAccountAvatar from "./MuteAccountAvatar/MuteAccountAvatar";

interface MutedAccountItemProps {
    mutedUser?: MutedUserResponse;
}

const MutedAccountItem: FC<MutedAccountItemProps> = memo(({ mutedUser }): ReactElement => {
    const classes = useMutedAccountItemStyles();

    return (
        <Paper className={classes.container}>
            <MuteAccountAvatar userId={mutedUser?.id!} avatar={mutedUser?.avatar!} />
            <div style={{ flex: 1 }}>
                <div className={classes.userInfoWrapper}>
                    <MuteAccountInfo
                        userId={mutedUser?.id!}
                        fullName={mutedUser?.fullName!}
                        username={mutedUser?.username!}
                        about={mutedUser?.about!}
                    />
                    <MuteAccountButton
                        userId={mutedUser?.id!}
                        username={mutedUser?.username!}
                        isUserMuted={mutedUser?.isUserMuted!}
                    />
                </div>
            </div>
        </Paper>
    );
});

export default MutedAccountItem;
