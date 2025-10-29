import React, { FC, ReactElement } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Paper, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useHomeStyles } from "./HomeStyles";
import AddTweetForm from "../../components/AddTweetForm/AddTweetForm";
import Welcome from "../../components/Welcome/Welcome";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import TopTweetActions from "./TopTweetActions";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { useHome } from "./useHome";

const Home: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useHomeStyles();
    const { t } = useTranslation();
    const {
        tweets,
        isLoading,
        isProfileStarted,
        switchTweets,
        page,
        pagesCount,
        loadTweets,
        handleLatestTweets,
        handleTopTweets
    } = useHome();

    return (
        <InfiniteScroll
            style={{ overflow: "unset" }}
            dataLength={tweets.length}
            next={loadTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                    <Typography variant="h5">
                        {t("HOME", { defaultValue: "Home" })}
                    </Typography>
                    <TopTweetActions
                        switchTweets={switchTweets}
                        handleLatestTweets={handleLatestTweets}
                        handleTopTweets={handleTopTweets}
                    />
                </Paper>
                <div className={classes.addForm}>
                    <AddTweetForm
                        title={t("WHATS_HAPPENING", { defaultValue: "What's happening?" })}
                        buttonName="Tweet"
                    />
                </div>
                <Divider />
                {!isProfileStarted ? (
                    <Welcome />
                ) : (
                    <>
                        {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
                        {isLoading && <Spinner />}
                    </>
                )}
            </Paper>
        </InfiniteScroll>
    );
};

export default withDocumentTitle(Home)("Home");
