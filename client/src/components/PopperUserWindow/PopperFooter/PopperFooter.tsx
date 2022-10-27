import React, {FC, memo, ReactElement} from "react";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";

import {
    selectUserDetailAbout,
    selectUserDetailId,
    selectUserDetailIsPrivateProfile,
    selectUserDetailSameFollowers
} from "../../../store/ducks/userDetail/selectors";
import FollowerGroup from "../../FollowerGroup/FollowerGroup";
import PopperFooterFollowing from "./PopperFooterFollowing";
import PopperFooterFollowers from "./PopperFooterFollowers";

interface PopperFooterProps {
    classes: ClassNameMap<string>
}

const PopperFooter: FC<PopperFooterProps> = memo(({classes}): ReactElement => {
    const userId = useSelector(selectUserDetailId);
    const about = useSelector(selectUserDetailAbout);
    const sameFollowers = useSelector(selectUserDetailSameFollowers);
    const isPrivateProfile = useSelector(selectUserDetailIsPrivateProfile);

    return (
        <>
            <Typography variant={"body1"} component={"div"} className={classes.userInfo}>{about}</Typography>
            <div className={classes.userFollowersWrapper}>
                <PopperFooterFollowing classes={classes}/>
                <PopperFooterFollowers classes={classes}/>
            </div>
            {!isPrivateProfile && <FollowerGroup userId={userId!} sameFollowers={sameFollowers}/>}
        </>
    );
});

export default PopperFooter;
