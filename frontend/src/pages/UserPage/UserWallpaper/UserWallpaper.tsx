import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { PROFILE_HEADER_PHOTO } from "../../../constants/path-constants";
import { selectUserProfileId, selectUserProfileWallpaper } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const UserWallpaper = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const location = useLocation();
    const userProfileId = useSelector(selectUserProfileId);
    const wallpaper = useSelector(selectUserProfileWallpaper);

    return (
        <div className={classes.wallpaper}>
            {wallpaper && (
                <Link to={{
                    pathname: `${PROFILE_HEADER_PHOTO}/${userProfileId}`,
                    state: { background: location, imageSrc: wallpaper }
                }}>
                    <img key={wallpaper} src={wallpaper} alt={wallpaper} />
                </Link>
            )}
        </div>
    );
});

export default UserWallpaper;
