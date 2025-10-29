import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
    fetchFollowersTweets,
    fetchTweets,
    resetTweets,
    setTweetsLoadingState
} from "../../store/ducks/tweets/actionCreators";
import { fetchUserData } from "../../store/ducks/user/actionCreators";
import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../store/ducks/tweets/selectors";
import { SEARCH } from "../../constants/path-constants";
import { LoadingStatus } from "../../types/common";
import { selectUserDataIsProfileStarted } from "../../store/ducks/user/selectors";

export const useHome = () => {
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const isProfileStarted = useSelector(selectUserDataIsProfileStarted);
    const pagesCount = useSelector(selectPagesCount);
    const [switchTweets, setSwitchTweets] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    const loadTweets = (): void => {
        if (switchTweets) {
            dispatch(fetchFollowersTweets(page));
        } else {
            dispatch(fetchTweets(page));
        }
        setPage((prevState) => prevState + 1);
    };

    const handleLatestTweets = (): void => {
        dispatch(resetTweets());
        dispatch(fetchFollowersTweets(0));
        handleSwitchTweets(true);
    };

    const handleTopTweets = (): void => {
        dispatch(resetTweets());
        dispatch(fetchTweets(0));
        handleSwitchTweets(false);
    };

    const handleSwitchTweets = (condition: boolean): void => {
        setSwitchTweets(condition);
        setPage(1);
    };

    useEffect(() => {
        dispatch(setTweetsLoadingState(LoadingStatus.NEVER));
        dispatch(fetchUserData());

        if (location.pathname !== SEARCH) {
            loadTweets();
        }
        document.body.style.overflow = "unset";
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    return {
        tweets,
        isLoading,
        isProfileStarted,
        switchTweets,
        page,
        pagesCount,
        loadTweets,
        handleLatestTweets,
        handleTopTweets
    };
};
