import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectIsTweetRetweeted } from "../../../store/ducks/tweet/selectors";
import { retweet } from "../../../store/ducks/tweets/actionCreators";

export const useRetweetIconButton = () => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);

    const handleRetweet = useCallback(() => {
        if (tweetId) {
            dispatch(retweet({ tweetId: parseInt(tweetId) }));
        }
    }, [dispatch, tweetId]);

    return { isTweetRetweeted, handleRetweet };
};
