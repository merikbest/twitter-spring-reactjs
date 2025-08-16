import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../../../store/ducks/tweets/selectors";
import { resetTweets } from "../../../../store/ducks/tweets/actionCreators";
import { fetchNotificationsFromTweetAuthors } from "../../../../store/ducks/notifications/actionCreators";

export const useNotificationsTimeline = () => {
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const pagesCount = useSelector(selectPagesCount);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);

    const loadNotifications = (page: number): void => {
        dispatch(fetchNotificationsFromTweetAuthors(page));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadNotifications(0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    return { tweets, isTweetsLoading, pagesCount, loadNotifications };
};
