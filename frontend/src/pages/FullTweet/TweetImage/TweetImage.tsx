import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

import { MODAL } from "../../../constants/path-constants";
import {
    selectTweetImageDescription,
    selectTweetImages,
    selectTweetTaggedImageUsers
} from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";
import TaggedImageUsers from "../../../components/TaggedImageUsers/TaggedImageUsers";
import ImageDescription from "../../../components/ImageDescription/ImageDescription";

const TweetImage = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const params = useParams<{ id: string }>();
    const location = useLocation();
    const images = useSelector(selectTweetImages);
    const imageDescription = useSelector(selectTweetImageDescription);
    const taggedImageUsers = useSelector(selectTweetTaggedImageUsers);
    const image = images?.[0];

    return (
        <>
            {image && (
                <>
                    <Link to={{ pathname: `${MODAL}/${params.id}`, state: { background: location } }}>
                        <div className={classes.image}>
                            <img src={image.src} alt={image.src} />
                        </div>
                    </Link>
                    {imageDescription && <ImageDescription imageDescription={imageDescription} isFullTweet />}
                    {(taggedImageUsers && taggedImageUsers.length !== 0) && (
                        <TaggedImageUsers
                            tweetId={Number(params.id)}
                            taggedImageUsers={taggedImageUsers}
                            isFullTweet
                        />
                    )}
                </>
            )}
        </>
    );
});

export default TweetImage;
