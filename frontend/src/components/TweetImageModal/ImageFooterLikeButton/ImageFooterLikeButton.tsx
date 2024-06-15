import React, { memo, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LikeIcon, LikeOutlinedIcon } from "../../../icons";
import { likeTweet } from "../../../store/ducks/tweets/actionCreators";
import { selectIsTweetLiked, selectLikesCount } from "../../../store/ducks/tweet/selectors";
import ImageFooterButton from "../ImageFooterButton/ImageFooterButton";

const ImageFooterLikeButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const isTweetLiked = useSelector(selectIsTweetLiked);
    const likesCount = useSelector(selectLikesCount);

    const handleLike = (): void => {
        dispatch(likeTweet({ tweetId: parseInt(params.id) }));
    };

    return (
        <ImageFooterButton
            id={"likesCount"}
            icon={isTweetLiked ? LikeIcon : LikeOutlinedIcon}
            count={likesCount ?? 0}
            onClick={handleLike}
        />
    );
});

export default ImageFooterLikeButton;
