import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { resetTweets } from "../../../store/ducks/tweets/actionCreators";
import { fetchTweetsByListId } from "../../../store/ducks/list/actionCreators";
import {
    selectIsTweetsLoaded,
    selectIsTweetsLoading,
    selectListTweets,
    selectListTweetsPagesCount
} from "../../../store/ducks/list/selectors";

export const useFullListTweets = () => {
    const dispatch = useDispatch();
    const { listId } = useParams<{ listId: string }>();
    const tweets = useSelector(selectListTweets);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const isTweetsLoaded = useSelector(selectIsTweetsLoaded);
    const pagesCount = useSelector(selectListTweetsPagesCount);

    useEffect(() => {
        loadTweets(0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadTweets = (pageNumber: number): void => {
        dispatch(fetchTweetsByListId({ listId: parseInt(listId), pageNumber }));
    };

    return { tweets, isTweetsLoading, isTweetsLoaded, pagesCount, loadTweets };
};
