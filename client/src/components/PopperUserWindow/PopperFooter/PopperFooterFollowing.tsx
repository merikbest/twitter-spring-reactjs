import React, {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {USER} from "../../../util/pathConstants";
import {selectUserDetailFollowersSize, selectUserDetailId} from "../../../store/ducks/userDetail/selectors";

interface PopperFooterFollowingProps {
    classes: ClassNameMap<string>
}

const PopperFooterFollowing: FC<PopperFooterFollowingProps> = memo(({classes}): ReactElement => {
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
