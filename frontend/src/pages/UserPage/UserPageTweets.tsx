import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Typography } from "@material-ui/core";

import TweetComponent from "../../components/TweetComponent/TweetComponent";
import { useUserPageStyles } from "./UserPageStyles";
import AddTweetModal from "../../components/AddTweetModal/AddTweetModal";
import Spinner from "../../components/Spinner/Spinner";
import {
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "../../store/ducks/userTweets/selectors";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { selectUserProfileId, selectUserProfileUsername } from "../../store/ducks/userProfile/selectors";
import { useModalWindow } from "../../hook/useModalWindow";

interface UserPageTweetsProps {
    activeTab: number;
    page: number;
    loadUserTweets: () => void;
}

const UserPageTweets: FC<UserPageTweetsProps> = memo(({ activeTab, page, loadUserTweets }): ReactElement => {
    const classes = useUserPageStyles();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const tweets = useSelector(selectUserTweetsItems);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const pagesCount = useSelector(selectPagesCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const renderTweets = () => {
        if (tweets?.length === 0 && activeTab === 0 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "You haven’t any Tweets yet"
                        ) : (
                            `@${username} hasn’t any Tweets`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId ? (
                            "When you send Tweets, they will show up here."
                        ) : (
                            "When they do, their Tweets show up here."
                        )}
                    </Typography>
                    {(userProfileId === myProfileId) && (
                        <Button
                            className={classes.button}
                            onClick={onOpenModalWindow}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            Send Tweet
                        </Button>
                    )}
                </div>
            );
        } else if (tweets?.length === 0 && activeTab === 1 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "You haven’t any replies yet"
                        ) : (
                            `@${username} hasn’t any replies`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(userProfileId === myProfileId) ? (
                            "When you reply Tweets, they will show up here."
                        ) : (
                            "When they do, their replies show up here."
                        )}
                    </Typography>
                </div>
            );
        } else if (tweets?.length === 0 && activeTab === 2 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "You haven’t Tweeted any photos or videos yet"
                        ) : (
                            `@${username} hasn’t Tweeted any photos or videos`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(userProfileId === myProfileId) ? (
                            "When you send Tweets with photos or videos in them, it will show up here."
                        ) : (
                            "When they do, their media will show up here."
                        )}
                    </Typography>
                    {(userProfileId === myProfileId) && (
                        <Button
                            className={classes.button}
                            onClick={onOpenModalWindow}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            Tweet a photo or video
                        </Button>
                    )}
                </div>
            );
        } else if (tweets?.length === 0 && activeTab === 3 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {(userProfileId === myProfileId) ? (
                            "You don’t have any likes yet"
                        ) : (
                            `@${username} hasn’t liked any Tweets`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {(userProfileId === myProfileId) ? (
                            "Tap the heart on any Tweet to show it some love. When you do, it’ll show up here."
                        ) : (
                            "When they do, those Tweets will show up here."
                        )}
                    </Typography>
                </div>
            );
        } else {
            return (
                <>
                    {tweets?.map((tweet) => (
                        <TweetComponent key={tweet.id} tweet={tweet} activeTab={activeTab} />
                    ))}
                    {isTweetsLoading && <Spinner />}
                </>
            );
        }
    };

    return (
        <InfiniteScroll
            style={{ overflow: "unset" }}
            dataLength={tweets.length}
            next={loadUserTweets}
            hasMore={page < pagesCount}
            loader={null}
        >
            {renderTweets()}
            <AddTweetModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </InfiniteScroll>
    );
});

export default UserPageTweets;
