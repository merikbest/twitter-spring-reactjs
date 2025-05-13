import React, { FC, ReactElement } from "react";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../util/globalClasses";
import TweetComponent from "../../components/TweetComponent/TweetComponent";
import Spinner from "../../components/Spinner/Spinner";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import { useQuoteTweets } from "./useQuoteTweets";

const QuoteTweets: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();
    const { tweets, isTweetsLoading, pagesCount, loadTweets } = useQuoteTweets();

    return (
        <InfiniteScrollWrapper dataLength={tweets.length} pagesCount={pagesCount} loadItems={loadTweets}>
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <PageHeaderWrapper backButton>
                    <Typography variant="h5" component="div">
                        {t("QUOTES_TWEETS", { defaultValue: "Quote Tweets" })}
                    </Typography>
                </PageHeaderWrapper>
                <div className={globalClasses.contentWrapper}>
                    {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                    {isTweetsLoading && <Spinner paddingTop={150} />}
                </div>
            </Paper>
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(QuoteTweets)("Quote Tweets");
