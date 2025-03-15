import React, { ChangeEvent, FC, memo, ReactElement } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useUserPageStyles } from "../UserPageStyles";
import {
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserPinnedTweet,
    fetchUserRetweetsAndReplies,
    fetchUserTweets
} from "../../../store/ducks/userTweets/actionCreators";
import {
    selectIsPinnedTweetLoading,
    selectIsUserTweetsLoaded,
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "../../../store/ducks/userTweets/selectors";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../../components/Spinner/Spinner";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import EmptyTweetsTab from "./EmptyTweetsTab/EmptyTweetsTab";
import EmptyRepliesTab from "./EmptyRepliesTab/EmptyRepliesTab";
import EmptyMediaTab from "./EmptyMediaTab/EmptyMediaTab";
import EmptyLikesTab from "./EmptyLikesTab/EmptyLikesTab";
import { useUserTweets } from "./useUserTweets";

interface UserTweetsProps {
    userTweetsActiveTab: number;
    handleChangeUserTweetsTab: (newValue: number) => void;
}

const UserTweets: FC<UserTweetsProps> = memo(({ userTweetsActiveTab, handleChangeUserTweetsTab }): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const { userId } = useParams<{ userId: string }>();
    const tweets = useSelector(selectUserTweetsItems);
    const isTweetsLoaded = useSelector(selectIsUserTweetsLoaded);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const isPinnedTweetLoading = useSelector(selectIsPinnedTweetLoading);
    const pagesCount = useSelector(selectPagesCount);
    const { t } = useTranslation();
    const { page, setPage, handleShowTweets } = useUserTweets();

    const handleChangeActiveTab = (event: ChangeEvent<{}>, newValue: number): void => {
        handleChangeUserTweetsTab(newValue);
    };

    const loadUserTweets = (): void => {
        if (userTweetsActiveTab === 0) {
            dispatch(fetchUserTweets({ userId, page }));
        }
        if (userTweetsActiveTab === 1) {
            dispatch(fetchUserRetweetsAndReplies({ userId, page }));
        }
        if (userTweetsActiveTab === 2) {
            dispatch(fetchUserMediaTweets({ userId, page }));
        }
        if (userTweetsActiveTab === 3) {
            dispatch(fetchUserLikedTweets({ userId, page }));
        }
        if (isTweetsLoaded) {
            setPage(prevState => prevState + 1);
        }
    };

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
                        onClick={() => {
                            dispatch(fetchUserPinnedTweet({ userId }))
                            handleShowTweets(fetchUserTweets);
                        }}
                    />
                    <Tab
                        label={t("TWEETS_AND_REPLIES", { defaultValue: "Tweets & replies" })}
                        onClick={() => handleShowTweets(fetchUserRetweetsAndReplies)}
                    />
                    <Tab
                        label={t("MEDIA", { defaultValue: "Media" })}
                        onClick={() => handleShowTweets(fetchUserMediaTweets)}
                    />
                    <Tab
                        label={t("LIKES", { defaultValue: "Likes" })}
                        onClick={() => handleShowTweets(fetchUserLikedTweets)}
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
                            {tweets?.map((tweet) =>
                                <TweetComponent key={tweet.id} tweet={tweet} activeTab={userTweetsActiveTab} />)}
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
