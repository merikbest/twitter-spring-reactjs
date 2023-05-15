import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { PROFILE } from "../../../../../../../constants/path-constants";
import { useGlobalStyles } from "../../../../../../../util/globalClasses";
import { useMutedAccountItemStyles } from "../MutedAccountItemStyles";

interface MuteAccountInfoProps {
    userId: number;
    fullName: string;
    username: string;
    about: string;
}

const MuteAccountInfo: FC<MuteAccountInfoProps> = memo((
    {
        userId,
        fullName,
        username,
        about
    }
): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useMutedAccountItemStyles();

    return (
        <Link to={`${PROFILE}/${userId}`} className={globalClasses.link}>
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
        </Link>
    );
});

export default MuteAccountInfo;
