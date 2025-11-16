import React, { FC, memo, ReactElement } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import { useUserPageStyles } from "../UserPageStyles";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import EmptyTweetsTab from "./EmptyTweetsTab";
import EmptyRepliesTab from "./EmptyRepliesTab";
import EmptyMediaTab from "./EmptyMediaTab";
import EmptyLikesTab from "./EmptyLikesTab";
import { useUserTweets } from "./useUserTweets";

interface UserTweetsProps {
    userTweetsActiveTab: number;
    handleChangeUserTweetsTab: (newValue: number) => void;
}

const UserTweets: FC<UserTweetsProps> = memo(({ userTweetsActiveTab, handleChangeUserTweetsTab }): ReactElement => {
    const classes = useUserPageStyles();
    const { t } = useTranslation();
    const {
        tweets,
        isTweetsLoading,
        isPinnedTweetLoading,
        page,
        pagesCount,
        handleTabClick,
        handleChangeActiveTab,
        loadUserTweets,
    } = useUserTweets(userTweetsActiveTab, handleChangeUserTweetsTab);

    return (
        <>
            <div className={classes.tabs}>
                <Tabs
                    value={userTweetsActiveTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeActiveTab}
                >
                    <Tab
                        label={t("TWEETS", { defaultValue: "Tweets" })}
                        onClick={() => handleTabClick(0)}
                    />
                    <Tab
                        label={t("TWEETS_AND_REPLIES", { defaultValue: "Tweets & replies" })}
                        onClick={() => handleTabClick(1)}
                    />
                    <Tab
                        label={t("MEDIA", { defaultValue: "Media" })}
                        onClick={() => handleTabClick(2)}
                    />
                    <Tab
                        label={t("LIKES", { defaultValue: "Likes" })}
                        onClick={() => handleTabClick(3)}
                    />
                </Tabs>
            </div>
            <Divider />
            <div className={classes.tweets}>
                <InfiniteScroll
                    style={{ overflow: "unset" }}
                    dataLength={tweets.length}
                    next={loadUserTweets}
                    hasMore={page < pagesCount}
                    loader={null}
                >
                    {(isTweetsLoading && isPinnedTweetLoading)
                        ? <Spinner />
                        : <>
                            {isTweetsLoading && <Spinner />}
                            {tweets?.map((tweet) => (
                                <TweetComponent key={tweet.id} tweet={tweet} activeTab={userTweetsActiveTab} />
                            ))}
                            {userTweetsActiveTab === 0 && <EmptyTweetsTab />}
                            {userTweetsActiveTab === 1 && <EmptyRepliesTab />}
                            {userTweetsActiveTab === 2 && <EmptyMediaTab />}
                            {userTweetsActiveTab === 3 && <EmptyLikesTab />}
                        </>
                    }
                </InfiniteScroll>
            </div>
        </>
    );
});

export default UserTweets;
