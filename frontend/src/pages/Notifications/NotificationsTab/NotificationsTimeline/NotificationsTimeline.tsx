import React, { FC, ReactElement } from "react";
import { Paper, Typography } from "@material-ui/core";

import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import PageHeaderWrapper from "../../../../components/PageHeaderWrapper/PageHeaderWrapper";
import { useNotificationsTimeline } from "./useNotificationsTimeline";

const NotificationsTimeline: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { tweets, isTweetsLoading, pagesCount, loadNotifications } = useNotificationsTimeline();

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadNotifications}>
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <PageHeaderWrapper backButton>
                    <Typography variant="h5" component="div">
                        Tweets
                    </Typography>
                </PageHeaderWrapper>
                <div className={globalClasses.contentWrapper}>
                    {(tweets.length === 0 && !isTweetsLoading) ? (
                        <Spinner />
                    ) : (
                        <>
                            {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                            {isTweetsLoading && <Spinner />}
                        </>
                    )}
                </div>
            </Paper>
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(NotificationsTimeline)("Notifications");
