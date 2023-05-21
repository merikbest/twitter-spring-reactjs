import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";

import { useTweetListComponentStyles } from "./TweetListComponentStyles";
import { ListsIconFilled, LockIcon } from "../../icons";
import { LISTS, PROFILE } from "../../constants/path-constants";
import { BaseListResponse, TweetListResponse } from "../../types/lists";
import { useGlobalStyles } from "../../util/globalClasses";

interface TweetListComponentProps {
    tweetList: TweetListResponse | BaseListResponse;
}

const TweetListComponent: FC<TweetListComponentProps> = memo(({ tweetList }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useTweetListComponentStyles();
    const listWallpaper = tweetList.wallpaper ?? tweetList.altWallpaper;

    return (
        <Link to={`${LISTS}/${tweetList.id}`} className={globalClasses.link}>
            <div className={classes.container}>
                <img className={classes.wallpaper} src={listWallpaper} alt={listWallpaper} />
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
                            {`${tweetList.membersSize} Members`}
                        </Typography>
                    </div>
                    <Typography className={classes.listTitle} variant={"subtitle2"} component={"div"}>
                        {tweetList.name}
                    </Typography>
                    <div>
                        <Link to={`${PROFILE}/${1}`}>
                            <Avatar
                                className={classes.listOwnerAvatar}
                                src={tweetList.listOwner.avatar}
                                alt={`avatar ${tweetList.listOwner.avatar}`}
                            />
                        </Link>
                        <Typography className={classes.listOwnerFullName} variant={"subtitle2"} component={"span"}>
                            {tweetList.listOwner.fullName}
                        </Typography>
                        {tweetList.listOwner.isPrivateProfile && (
                            <span className={classes.lockIcon}>{LockIcon}</span>
                        )}
                        {" "}
                        <Typography variant={"subtitle2"} component={"span"}>
                            @{tweetList.listOwner.username}
                        </Typography>
                    </div>
                </div>
            </div>
        </Link>
    );
});

export default TweetListComponent;
