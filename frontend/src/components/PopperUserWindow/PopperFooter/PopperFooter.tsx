import React, { memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import {
    selectUserDetailAbout,
    selectUserDetailId,
    selectUserDetailIsPrivateProfile,
    selectUserDetailSameFollowers
} from "../../../store/ducks/userDetail/selectors";
import FollowerGroup from "../../FollowerGroup/FollowerGroup";
import PopperFooterFollowing from "./PopperFooterFollowing";
import PopperFooterFollowers from "./PopperFooterFollowers";
import { usePopperFooterStyles } from "./PopperFooterStyles";

const PopperFooter = memo((): ReactElement => {
    const classes = usePopperFooterStyles();
    const userId = useSelector(selectUserDetailId);
    const about = useSelector(selectUserDetailAbout);
    const sameFollowers = useSelector(selectUserDetailSameFollowers);
    const isPrivateProfile = useSelector(selectUserDetailIsPrivateProfile);

    return (
        <>
            <Typography variant={"body1"} component={"div"} className={classes.userInfo}>{about}</Typography>
            <div className={classes.userFollowersWrapper}>
                <PopperFooterFollowing />
                <PopperFooterFollowers />
            </div>
            {!isPrivateProfile && <FollowerGroup userId={userId!} sameFollowers={sameFollowers} />}
        </>
    );
});

export default PopperFooter;
