import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';

import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../../store/ducks/tweets/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import {resetTweets} from "../../../store/ducks/tweets/actionCreators";
import {fetchMentions} from '../../../store/ducks/notifications/actionCreators';
import EmptyNotifications from "../EmptyNotifications/EmptyNotifications";

const MentionsPage: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadTweets();

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadTweets = (): void => {
        dispatch(fetchMentions(page));
        setPage(prevState => prevState + 1);
    };

    return (
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            {(!tweets.length && !isLoading) ? (
                <EmptyNotifications isNotification={false}/>
            ) : (
                <>
                    {tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                    {isLoading && <Spinner/>}
                </>
            )}
        </InfiniteScroll>
    );
};

export default MentionsPage;
