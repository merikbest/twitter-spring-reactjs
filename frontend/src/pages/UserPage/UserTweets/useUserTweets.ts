import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserPinnedTweet,
    fetchUserRetweetsAndReplies,
    fetchUserTweets,
    resetUserTweets
} from "../../../store/ducks/userTweets/actionCreators";
import { selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";
import {
    selectIsPinnedTweetLoading,
    selectIsUserTweetsLoaded,
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "../../../store/ducks/userTweets/selectors";

export const useUserTweets = (userTweetsActiveTab: number, handleChangeUserTweetsTab: any) => {
    const dispatch = useDispatch();
    const { userId } = useParams<{ userId: string }>();
    const tweets = useSelector(selectUserTweetsItems);
    const isTweetsLoaded = useSelector(selectIsUserTweetsLoaded);
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const isPinnedTweetLoading = useSelector(selectIsPinnedTweetLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [page, setPage] = useState<number>(0);

    const handleTabClick = (tabIndex: number): void => {
        window.scrollTo(0, 0);
        setPage(1);
        dispatch(resetUserTweets());

        if (tabIndex === 0) {
            dispatch(fetchUserPinnedTweet({ userId }));
            dispatch(fetchUserTweets({ userId, page: 0 }));
        }
        if (tabIndex === 1) {
            dispatch(fetchUserRetweetsAndReplies({ userId, page: 0 }));
        }
        if (tabIndex === 2) {
            dispatch(fetchUserMediaTweets({ userId, page: 0 }));
        }
        if (tabIndex === 3) {
            dispatch(fetchUserLikedTweets({ userId, page: 0 }));
        }
    };

    const handleChangeActiveTab = (event: ChangeEvent<{}>, newValue: number): void => {
        handleChangeUserTweetsTab(newValue);
    };

    const loadUserTweets = (): void => {
        if (userTweetsActiveTab === 0) {
            dispatch(fetchUserTweets({ userId, page }));
        }
        if (userTweetsActiveTab === 1) {
            dispatch(fetchUserRetweetsAndReplies({ userId, page }));
        }
        if (userTweetsActiveTab === 2) {
            dispatch(fetchUserMediaTweets({ userId, page }));
        }
        if (userTweetsActiveTab === 3) {
            dispatch(fetchUserLikedTweets({ userId, page }));
        }
        if (isTweetsLoaded) {
            setPage(prevState => prevState + 1);
        }
    };

    useEffect(() => {
        if (isUserProfileSuccessLoaded) {
            setPage(prevState => prevState + 1);
        }
    }, [isUserProfileSuccessLoaded]);

    return {
        tweets,
        isTweetsLoading,
        isPinnedTweetLoading,
        page,
        pagesCount,
        handleTabClick,
        handleChangeActiveTab,
        loadUserTweets
    };
};
