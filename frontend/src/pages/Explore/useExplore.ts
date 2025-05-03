import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
    fetchMediaTweets,
    fetchTweets,
    fetchTweetsByTag,
    fetchTweetsByText,
    fetchTweetsWithVideo,
    resetTweets
} from "../../store/ducks/tweets/actionCreators";
import {
    fetchUsersSearch,
    fetchUsersSearchByUsername,
    resetUsersState
} from "../../store/ducks/usersSearch/actionCreators";
import { selectPagesCount, selectTweetsItemsSize } from "../../store/ducks/tweets/selectors";
import { selectUsersPagesCount } from "../../store/ducks/usersSearch/selectors";
import {
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface
} from "../../store/ducks/tweets/contracts/actionTypes";

export const useExplore = () => {
    const dispatch = useDispatch();
    const tweetsSize = useSelector(selectTweetsItemsSize);
    const tweetsPagesCount = useSelector(selectPagesCount);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const location = useLocation<{ tag: string | undefined; text: string | undefined; }>();
    const history = useHistory();
    const [searchText, setSearchText] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    const fetchTweetsByStateText = (fetch: FetchTweetsByTextActionInterface | FetchTweetsByTagActionInterface, stateText: string): void => {
        dispatch(fetch);
        setSearchText(decodeURIComponent(stateText));
        setPageNumber(prevState => prevState + 1);
    };

    const loadTweets = (): void => {
        if (searchText) {
            const encodedText = encodeURIComponent(searchText);

            if (activeTab !== 2) {
                dispatch(fetchTweetsByText({ text: encodedText, pageNumber }));
            } else {
                dispatch(fetchUsersSearchByUsername({ username: encodedText, pageNumber }));
            }
        } else {
            if (activeTab === 2) {
                dispatch(fetchUsersSearch(pageNumber));
            } else if (activeTab === 3) {
                dispatch(fetchMediaTweets(pageNumber));
            } else if (activeTab === 4) {
                dispatch(fetchTweetsWithVideo(pageNumber));
            } else {
                dispatch(fetchTweets(pageNumber));
            }
        }
        setPageNumber(prevState => prevState + 1);
    };

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setSearchText("");
        setActiveTab(newValue);
    };

    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (searchText) {
            const encodedText = encodeURIComponent(searchText);

            if (activeTab !== 2) {
                dispatch(resetTweets());
                dispatch(fetchTweetsByText({ text: encodedText, pageNumber: 0 }));
            } else {
                dispatch(resetUsersState());
                dispatch(fetchUsersSearchByUsername({ username: encodedText, pageNumber: 0 }));
            }
        }
    };

    const handleSearchText = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setSearchText(event.target.value);
    };

    const showTopTweets = (): void => {
        resetState();
        dispatch(fetchTweets(0));
        setPageNumber(prevState => prevState + 1);
    };

    const showUsers = (): void => {
        resetState();
        dispatch(fetchUsersSearch(0));
        setPageNumber(prevState => prevState + 1);
    };

    const showMediaTweets = (): void => {
        resetState();
        dispatch(fetchMediaTweets(0));
        setPageNumber(prevState => prevState + 1);
    };

    const showTweetsWithVideos = (): void => {
        resetState();
        dispatch(fetchTweetsWithVideo(0));
        setPageNumber(prevState => prevState + 1);
    };

    const resetState = (): void => {
        window.scrollTo(0, 0);
        setPageNumber(0);
        dispatch(resetTweets());
        dispatch(resetUsersState());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadTweets();

        return () => {
            dispatch(resetTweets());
            history.replace({ state: {} });
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.state?.tag) {
            fetchTweetsByStateText(fetchTweetsByTag({ tag: location.state.tag, pageNumber: 0 }), location.state.tag);
        }
        if (location.state?.text) {
            fetchTweetsByStateText(fetchTweetsByText({ text: location.state.text, pageNumber: 0 }), location.state.text);
        }

        return () => {
            dispatch(resetTweets());
        };
    }, [location.state]);

    return {
        pageNumber,
        tweetsSize,
        tweetsPagesCount,
        usersPagesCount,
        searchText,
        activeTab,
        handleChangeTab,
        handleSubmitSearch,
        handleSearchText,
        loadTweets,
        showTopTweets,
        showUsers,
        showMediaTweets,
        showTweetsWithVideos
    };
};
