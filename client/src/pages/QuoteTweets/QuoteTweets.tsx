import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Paper, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";

import {useGlobalStyles} from "../../util/globalClasses";
import BackButton from "../../components/BackButton/BackButton";
import {selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "../../store/ducks/tweets/selectors";
import {fetchQuotesByTweetId, resetTweets} from "../../store/ducks/tweets/actionCreators";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import Spinner from "../../components/Spinner/Spinner";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";

const QuoteTweets: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const params = useParams<{ tweetId: string }>();
    const tweets = useSelector(selectTweetsItems);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        loadTweets(0);

        return () => {
            dispatch(resetTweets());
        };
    }, [params.tweetId]);

    const loadTweets = (page: number): void => {
        dispatch(fetchQuotesByTweetId({tweetId: parseInt(params.tweetId), pageNumber: page}));
    };

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadTweets}>
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={globalClasses.pageHeader} variant="outlined">
                    <BackButton/>
                    <Typography variant={"h5"} component={"div"}>
                        Quote Tweets
                    </Typography>
                </Paper>
                <div className={globalClasses.contentWrapper}>
                    {tweets.map((tweet) => <TweetComponent key={tweet.id} item={tweet}/>)}
                    {isTweetsLoading && <Spinner paddingTop={150}/>}
                </div>
            </Paper>
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(QuoteTweets)("Quote Tweets");
