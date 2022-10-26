import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import {PROFILE} from "../../../util/pathConstants";
import {useGlobalStyles} from "../../../util/globalClasses";
import {selectUserData, selectUserProfileAvatar} from "../../../store/ducks/user/selectors";

const ProfileAvatar = memo((): ReactElement => {
    const globalClasses = useGlobalStyles();
    const myProfile = useSelector(selectUserData);
    const avatar = useSelector(selectUserProfileAvatar);

    return (
        <Link to={`${PROFILE}/${myProfile?.id}`}>
            <Avatar className={globalClasses.avatar} src={avatar} alt={`avatar ${myProfile?.id}`}/>
        </Link>
    );
});

export default ProfileAvatar;
