import React, { memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import EmptyPageDescription from "../../../components/EmptyPageDescription/EmptyPageDescription";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../components/Spinner/Spinner";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import { useFullListTweets } from "./useFullListTweets";

const FullListTweets = memo((): ReactElement => {
    const { t } = useTranslation();
    const { tweets, isTweetsLoading, isTweetsLoaded, pagesCount, loadTweets } = useFullListTweets();

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadTweets}>
            {(tweets.length === 0 && isTweetsLoaded) ? (
                <EmptyPageDescription
                    title={t("EMPTY_LIST_TWEETS_TITLE", { defaultValue: "There aren’t any Tweets in this List" })}
                    subtitle={t("EMPTY_LIST_TWEETS_DESCRIPTION", { defaultValue: "When anyone in this List Tweets, they’ll show up here." })}
                />
            ) : (
                <>
                    {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                    {isTweetsLoading && <Spinner paddingTop={150} />}
                </>
            )}
        </InfiniteScrollWrapper>
    );
});

export default FullListTweets;
