import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { USER } from "../../../constants/path-constants";
import { selectUserDetailFollowersSize, selectUserDetailId } from "../../../store/ducks/userDetail/selectors";
import { usePopperFooterStyles } from "./PopperFooterStyles";

const PopperFooterFollowing = memo((): ReactElement => {
    const classes = usePopperFooterStyles();
    const userId = useSelector(selectUserDetailId);
    const followersSize = useSelector(selectUserDetailFollowersSize);

    return (
        <Link to={`${USER}/${userId}/following`} className={classes.followLink}>
            <Typography variant={"h6"} component={"span"}>{followersSize}</Typography>
            <Typography variant={"subtitle1"} component={"span"}>Following</Typography>
        </Link>
    );
});

export default PopperFooterFollowing;
