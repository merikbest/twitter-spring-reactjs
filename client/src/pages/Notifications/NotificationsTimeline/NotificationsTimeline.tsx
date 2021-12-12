import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Paper, Typography} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import {useNotificationsTimelineStyles} from "./NotificationsTimelineStyles";
import BackButton from "../../../components/BackButton/BackButton";
import {fetchNotificationsFromTweetAuthors} from "../../../store/ducks/notifications/actionCreators";
import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../../store/ducks/tweets/selectors";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../components/Spinner/Spinner";
import {resetTweets} from "../../../store/ducks/tweets/actionCreators";

const NotificationsTimeline: FC = (): ReactElement => {
    const classes = useNotificationsTimelineStyles();
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const pagesCount = useSelector(selectPagesCount);
    const isLoading = useSelector(selectIsTweetsLoading);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadNotifications();

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadNotifications = () => {
        dispatch(fetchNotificationsFromTweetAuthors(page));
        setPage(prevState => prevState + 1);
    };

    return (
        <InfiniteScroll
            style={{overflow: "unset"}}
            dataLength={tweets.length}
            next={loadNotifications}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={classes.container} variant="outlined">
                <Paper className={classes.header} variant="outlined">
                    <BackButton/>
                    <Typography component="div" className={classes.title}>
                        Tweets
                    </Typography>
                </Paper>
                <div className={classes.contentWrapper}>
                    {(tweets.length === 0 && !isLoading) ? (
                        <Spinner/>
                    ) : (
                        <>
                            {tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                            {isLoading && <Spinner/>}
                        </>
                    )}
                </div>
            </Paper>
        </InfiniteScroll>
    );
};

export default NotificationsTimeline;
