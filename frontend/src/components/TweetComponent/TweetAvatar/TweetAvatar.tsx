import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import { PROFILE } from "../../../constants/path-constants";
import { useGlobalStyles } from "../../../util/globalClasses";

interface TweetAvatarProps {
    src?: string;
    userId?: number;
}

const TweetAvatar: FC<TweetAvatarProps> = memo(({ src, userId }): ReactElement => {
    const globalClasses = useGlobalStyles({});

    return (
        <Link to={`${PROFILE}/${userId}`}>
            <Avatar className={globalClasses.avatar} src={src} alt={`avatar ${userId}`} />
        </Link>
    );
});

export default TweetAvatar;
