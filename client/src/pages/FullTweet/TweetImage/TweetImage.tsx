import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import {Link, useLocation, useParams} from "react-router-dom";

import {MODAL} from "../../../util/pathConstants";
import {selectTweetImages} from "../../../store/ducks/tweet/selectors";
import {useFullTweetStyles} from "../FullTweetStyles";

const TweetImage = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const params = useParams<{ id: string }>();
    const location = useLocation();
    const images = useSelector(selectTweetImages);
    const image = images?.[0];

    return (
        <>
            {image && (
                <Link to={{pathname: `${MODAL}/${params.id}`, state: {background: location}}}>
                    <div className={classes.image}>
                        <img src={image.src} alt={image.src}/>
                    </div>
                </Link>
            )}
        </>
    );
});

export default TweetImage;
