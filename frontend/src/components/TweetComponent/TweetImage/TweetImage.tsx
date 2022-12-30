import React, {FC, memo, ReactElement} from "react";
import {Link, useLocation} from "react-router-dom";

import {MODAL} from "../../../util/pathConstants";
import {useTweetImageStyles} from "./TweetImageStyles";

interface TweetImageProps {
    tweetId?: number;
    imageSrc?: string;
}

const TweetImage: FC<TweetImageProps> = memo(({tweetId, imageSrc}): ReactElement => {
    const classes = useTweetImageStyles();
    const location = useLocation();
    const isModal = location.pathname.includes(MODAL);

    return (
        <Link to={{pathname: `${MODAL}/${tweetId}`, state: {background: location}}}>
            <div id={"tweetImage"} className={classes.image}>
                <img className={isModal ? "small" : ""} src={imageSrc} alt={imageSrc}/>
            </div>
        </Link>
    );
});

export default TweetImage;
