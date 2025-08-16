import React, { FC, ReactElement } from "react";

import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../components/Spinner/Spinner";
import EmptyNotifications from "../EmptyNotifications";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import { useMentionsTab } from "./useMentionsTab";

const MentionsTab: FC = (): ReactElement => {
    const { tweets, isTweetsLoading, pagesCount, loadTweets } = useMentionsTab();

    if (!tweets.length && !isTweetsLoading) {
        return <EmptyNotifications isNotification={false} />;
    }

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadTweets}>
            {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
            {isTweetsLoading && <Spinner />}
        </InfiniteScrollWrapper>
    );
};

export default MentionsTab;
