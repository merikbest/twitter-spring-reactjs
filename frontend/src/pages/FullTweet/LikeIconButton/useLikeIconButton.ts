import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { likeTweet } from "../../../store/ducks/tweets/actionCreators";
import { selectIsTweetLiked } from "../../../store/ducks/tweet/selectors";

export const useLikeIconButton = () => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const isTweetLiked = useSelector(selectIsTweetLiked);

    const handleLike = useCallback(() => {
        if (tweetId) {
            dispatch(likeTweet({ tweetId: parseInt(tweetId) }));
        }
    }, [dispatch, tweetId]);

    return { isTweetLiked, handleLike };
};
