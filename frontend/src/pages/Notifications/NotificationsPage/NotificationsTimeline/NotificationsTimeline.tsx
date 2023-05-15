import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { fetchNotificationsFromTweetAuthors } from "../../../../store/ducks/notifications/actionCreators";
import { selectIsTweetsLoading, selectPagesCount, selectTweetsItems } from "../../../../store/ducks/tweets/selectors";
import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../../components/Spinner/Spinner";
import { resetTweets } from "../../../../store/ducks/tweets/actionCreators";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import PageHeaderWrapper from "../../../../components/PageHeaderWrapper/PageHeaderWrapper";

const NotificationsTimeline: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const pagesCount = useSelector(selectPagesCount);
    const isLoading = useSelector(selectIsTweetsLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadNotifications(0);

        return () => {
            dispatch(resetTweets());
        };
    }, []);

    const loadNotifications = (page: number) => {
        dispatch(fetchNotificationsFromTweetAuthors(page));
    };

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadNotifications}>
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <PageHeaderWrapper backButton>
                    <Typography variant={"h5"} component="div">
                        Tweets
                    </Typography>
                </PageHeaderWrapper>
                <div className={globalClasses.contentWrapper}>
                    {(tweets.length === 0 && !isLoading) ? (
                        <Spinner />
                    ) : (
                        <>
                            {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                            {isLoading && <Spinner />}
                        </>
                    )}
                </div>
            </Paper>
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(NotificationsTimeline)("Notifications");
