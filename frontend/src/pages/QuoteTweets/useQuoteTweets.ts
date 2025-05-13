import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../store/ducks/tweets/selectors";
import { fetchQuotesByTweetId, resetTweets } from "../../store/ducks/tweets/actionCreators";

export const useQuoteTweets = () => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const tweets = useSelector(selectTweetsItems);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);

    const loadTweets = (pageNumber: number): void => {
        dispatch(fetchQuotesByTweetId({ tweetId: parseInt(tweetId), pageNumber }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadTweets(0);

        return () => {
            dispatch(resetTweets());
        };
    }, [tweetId]);

    return { tweets, isTweetsLoading, pagesCount, loadTweets };
};
