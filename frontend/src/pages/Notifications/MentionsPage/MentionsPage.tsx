import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../../store/ducks/tweets/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import { resetTweets } from "../../../store/ducks/tweets/actionCreators";
import { fetchMentions } from "../../../store/ducks/notifications/actionCreators";
import EmptyNotifications from "../EmptyNotifications/EmptyNotifications";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import { resetMentions } from "../../../store/ducks/user/actionCreators";

const MentionsPage: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
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

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadTweets}>
            {(!tweets.length && !isLoading) ? (
                <EmptyNotifications isNotification={false} />
            ) : (
                <>
                    {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                    {isLoading && <Spinner />}
                </>
            )}
        </InfiniteScrollWrapper>
    );
};

export default MentionsPage;
