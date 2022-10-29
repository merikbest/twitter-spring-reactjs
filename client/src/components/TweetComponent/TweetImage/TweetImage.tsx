import React, {FC, memo, ReactElement} from "react";
import {Link, useLocation} from "react-router-dom";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {MODAL} from "../../../util/pathConstants";

interface TweetImageProps {
    classes: ClassNameMap<string>;
    tweetId?: number;
    imageSrc?: string;
}

const TweetImage: FC<TweetImageProps> = memo(({classes, tweetId, imageSrc}): ReactElement => {
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
