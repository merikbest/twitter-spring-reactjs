import React, {FC, memo, ReactElement} from "react";
import {Typography} from "@material-ui/core";

import {useBlockedAccountItemStyles} from "../BlockedAccountItemStyles";

interface BlockedAccountInfoProps {
    fullName: string;
    username: string;
    about: string;
}

const BlockedAccountInfo: FC<BlockedAccountInfoProps> = memo(({fullName, username, about}): ReactElement => {
    const classes = useBlockedAccountItemStyles();

    return (
        <div className={classes.userInfo}>
            <div>
                <Typography variant={"h6"} component={"span"}>
                    {fullName}
                </Typography>
            </div>
            <Typography variant={"subtitle1"} component={"div"}>
                @{username}
            </Typography>
            <Typography variant={"body1"} component={"div"}>
                {about}
            </Typography>
        </div>
    );
});

export default BlockedAccountInfo;
