import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../../store/ducks/tweets/selectors";
import { resetMentions } from "../../../store/ducks/user/actionCreators";
import { resetTweets } from "../../../store/ducks/tweets/actionCreators";
import { fetchMentions } from "../../../store/ducks/notifications/actionCreators";

export const useMentionsTab = () => {
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadTweets(0);
        dispatch(resetMentions());

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadTweets = (page: number): void => {
        dispatch(fetchMentions(page));
    };

    return { tweets, isTweetsLoading, pagesCount, loadTweets };
};
