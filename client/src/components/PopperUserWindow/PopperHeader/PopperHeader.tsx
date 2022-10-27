import React, {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {useSelector} from "react-redux";

import {PROFILE} from "../../../util/pathConstants";
import BlockButton from "../../Buttons/BlockButton/BlockButton";
import PendingButton from "../../Buttons/PendingButton/PendingButton";
import FollowButton from "../../Buttons/FollowButton/FollowButton";
import UnfollowButton from "../../Buttons/UnfollowButton/UnfollowButton";
import {
    selectUserDetailAvatar,
    selectUserDetailFullName,
    selectUserDetailId,
    selectUserDetailIsFollower,
    selectUserDetailIsMyProfileBlocked,
    selectUserDetailIsPrivateProfile,
    selectUserDetailIsUserBlocked,
    selectUserDetailIsWaitingForApprove,
    selectUserDetailUsername
} from "../../../store/ducks/userDetail/selectors";
import {selectUserDataId} from "../../../store/ducks/user/selectors";

interface PopperHeaderProps {
    classes: ClassNameMap<string>
}

const PopperHeader: FC<PopperHeaderProps> = memo(({classes}): ReactElement => {
    const myProfileId = useSelector(selectUserDataId);
    const userId = useSelector(selectUserDetailId);
    const username = useSelector(selectUserDetailUsername);
    const fullName = useSelector(selectUserDetailFullName);
    const avatar = useSelector(selectUserDetailAvatar);
    const isMyProfileBlocked = useSelector(selectUserDetailIsMyProfileBlocked);
    const isFollower = useSelector(selectUserDetailIsFollower);
    const isUserBlocked = useSelector(selectUserDetailIsUserBlocked);
    const isWaitingForApprove = useSelector(selectUserDetailIsWaitingForApprove);
    const isPrivateProfile = useSelector(selectUserDetailIsPrivateProfile);

    return (
        <div className={classes.headerWrapper}>
            <Link to={`${PROFILE}/${userId}`}>
                <Avatar className={classes.avatar} src={avatar} alt={`avatar ${userId}`}/>
            </Link>
            {(myProfileId === userId) ? null : (
                (isMyProfileBlocked) ? null : (
                    (!isFollower) ? (
                        (isUserBlocked) ? (
                            <BlockButton userId={userId!} username={username!} isUserBlocked={isUserBlocked}/>
                        ) : (
                            (isWaitingForApprove) ? (
                                <PendingButton userId={userId!}/>
                            ) : (
                                <FollowButton userId={userId!} isPrivateProfile={isPrivateProfile!}/>
                            )
                        )
                    ) : (
                        <UnfollowButton userId={userId!} isPrivateProfile={isPrivateProfile!} fullName={fullName!}/>
                    )
                )
            )}
        </div>
    );
});

export default PopperHeader;
