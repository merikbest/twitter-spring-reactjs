import React, { FC, memo, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

import { MODAL } from "../../../constants/path-constants";
import { useTweetImageStyles } from "./TweetImageStyles";
import { TaggedUserResponse } from "../../../types/user";
import ImageDescription from "../../ImageDescription/ImageDescription";
import TaggedImageUsers from "../../TaggedImageUsers/TaggedImageUsers";

interface TweetImageProps {
    tweetId?: number;
    imageSrc?: string;
    imageDescription?: string;
    taggedImageUsers?: TaggedUserResponse[];
}

const TweetImage: FC<TweetImageProps> = memo((
    {
        tweetId,
        imageSrc,
        imageDescription,
        taggedImageUsers
    }
): ReactElement => {
    const classes = useTweetImageStyles();
    const location = useLocation();
    const isModal = location.pathname.includes(MODAL);

    return (
        <div id={"tweetImage"} className={classes.image}>
            <Link to={{ pathname: `${MODAL}/${tweetId}`, state: { background: location } }}>
                <img className={isModal ? "small" : ""} src={imageSrc} alt={imageSrc} />
            </Link>
            {imageDescription && <ImageDescription imageDescription={imageDescription} />}
            {(taggedImageUsers && taggedImageUsers.length !== 0) &&
                <TaggedImageUsers tweetId={tweetId!} taggedImageUsers={taggedImageUsers} />}
        </div>
    );
});

export default TweetImage;
