import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserBookmarks, resetTweets } from "../../store/ducks/tweets/actionCreators";
import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../store/ducks/tweets/selectors";

export const useBookmarks = () => {
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadBookmarks(0);

        return () => {
            dispatch(resetTweets());
        };
    }, [dispatch]);

    const loadBookmarks = (page: number): void => {
        dispatch(fetchUserBookmarks(page));
    };

    return { tweets, isLoading, pagesCount, loadBookmarks };
};
