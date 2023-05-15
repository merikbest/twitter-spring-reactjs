import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import { PROFILE } from "../../../constants/path-constants";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectUserDataId, selectUserProfileAvatar } from "../../../store/ducks/user/selectors";

const ProfileAvatar = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const myProfileId = useSelector(selectUserDataId);
    const avatar = useSelector(selectUserProfileAvatar);

    return (
        <Link to={`${PROFILE}/${myProfileId}`}>
            <Avatar className={globalClasses.avatar} src={avatar} alt={`avatar ${myProfileId}`} />
        </Link>
    );
});

export default ProfileAvatar;
