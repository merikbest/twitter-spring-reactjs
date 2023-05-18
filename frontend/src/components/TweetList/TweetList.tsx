import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";

import { useTweetListStyles } from "./TweetListStyles";
import { wallpapers } from "../../util/wallpapers";
import { ListsIconFilled, LockIcon } from "../../icons";
import { PROFILE } from "../../constants/path-constants";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";

interface TweetListProps {

}

const TweetList: FC<TweetListProps> = ({}): ReactElement => {
    const classes = useTweetListStyles();
    const listWallpaper = wallpapers[2];

    return (
        <div className={classes.container}>
            <img className={classes.wallpaper} key={listWallpaper} src={listWallpaper} alt={listWallpaper} />
            <div className={classes.contentInfo}>
                <div>
                    <div className={classes.listIcon}>
                        {ListsIconFilled}
                    </div>
                    <Typography className={classes.listName} variant={"subtitle2"} component={"span"}>
                        List
                    </Typography>
                    {" · "}
                    <Typography variant={"subtitle2"} component={"span"}>
                        7 Members
                    </Typography>
                </div>
                <Typography className={classes.listTitle} variant={"subtitle2"} component={"div"}>
                    testlist
                </Typography>
                <div>
                    <Link to={`${PROFILE}/${1}`}>
                        <Avatar className={classes.listOwnerAvatar}
                            src={DEFAULT_PROFILE_IMG}
                            alt={`avatar ${DEFAULT_PROFILE_IMG}`}
                        />
                    </Link>
                    <Typography className={classes.listOwnerFullName} variant={"subtitle2"} component={"span"}>
                        testuser
                    </Typography>
                    <span className={classes.lockIcon}>{LockIcon}</span>
                    {" "}
                    <Typography variant={"subtitle2"} component={"span"}>
                        @testuser
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default TweetList;
