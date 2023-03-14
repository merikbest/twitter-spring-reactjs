import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { PROFILE } from "../../../constants/path-constants";
import { LockIcon } from "../../../icons";
import {
    selectUserDetailFullName,
    selectUserDetailId,
    selectUserDetailIsPrivateProfile,
    selectUserDetailUsername
} from "../../../store/ducks/userDetail/selectors";
import { usePopperInfoStyles } from "./PopperInfoStyles";

const PopperInfo = memo((): ReactElement => {
    const classes = usePopperInfoStyles();
    const userId = useSelector(selectUserDetailId);
    const fullName = useSelector(selectUserDetailFullName);
    const username = useSelector(selectUserDetailUsername);
    const isPrivateProfile = useSelector(selectUserDetailIsPrivateProfile);

    return (
        <div className={classes.userInfoWrapper}>
            <Link to={`${PROFILE}/${userId}`}>
                <div>
                    <Typography variant={"h6"} component={"span"}>{fullName}</Typography>
                    {isPrivateProfile && <span className={classes.lockIcon}>{LockIcon}</span>}
                </div>
            </Link>
            <Typography variant={"subtitle1"} component={"div"}>@{username}</Typography>
        </div>
    );
});

export default PopperInfo;
