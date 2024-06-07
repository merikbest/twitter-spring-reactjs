import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { USER } from "../../../constants/path-constants";
import { selectUserDetailFollowingCount, selectUserDetailId } from "../../../store/ducks/userDetail/selectors";
import { usePopperFooterStyles } from "./PopperFooterStyles";

const PopperFooterFollowers = memo((): ReactElement => {
    const classes = usePopperFooterStyles();
    const userId = useSelector(selectUserDetailId);
    const followingSize = useSelector(selectUserDetailFollowingCount);

    return (
        <Link to={`${USER}/${userId}/followers`} className={classes.followLink}>
            <Typography variant={"h6"} component={"span"}>{followingSize}</Typography>
            <Typography variant={"subtitle1"} component={"span"}>Followers</Typography>
        </Link>
    );
});

export default PopperFooterFollowers;
