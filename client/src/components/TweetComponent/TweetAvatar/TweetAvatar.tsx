import React, {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";

import {PROFILE} from "../../../util/pathConstants";
import {useGlobalStyles} from "../../../util/globalClasses";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";

interface TweetAvatarProps {
    src?: string;
    userId?: number;
}

const TweetAvatar: FC<TweetAvatarProps> = memo(({src, userId}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const avatar = src ? src : DEFAULT_PROFILE_IMG;

    return (
        <Link to={`${PROFILE}/${userId}`}>
            <Avatar className={globalClasses.avatar} src={avatar} alt={`avatar ${userId}`}/>
        </Link>
    );
});

export default TweetAvatar;
