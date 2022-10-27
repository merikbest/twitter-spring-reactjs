import React, {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";

import {USER} from "../../../util/pathConstants";
import {selectUserDetailFollowingSize, selectUserDetailId} from "../../../store/ducks/userDetail/selectors";

interface PopperFooterFollowingProps {
    classes: ClassNameMap<string>
}

const PopperFooterFollowers: FC<PopperFooterFollowingProps> = memo(({classes}): ReactElement => {
    const userId = useSelector(selectUserDetailId);
    const followingSize = useSelector(selectUserDetailFollowingSize);

    return (
        <Link to={`${USER}/${userId}/followers`} className={classes.followLink}>
            <Typography variant={"h6"} component={"span"}>{followingSize}</Typography>
            <Typography variant={"subtitle1"} component={"span"}>Followers</Typography>
        </Link>
    );
});

export default PopperFooterFollowers;
