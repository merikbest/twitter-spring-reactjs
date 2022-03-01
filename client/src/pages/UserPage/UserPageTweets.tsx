import React, {FC, ReactElement, useState} from 'react';
import {Button, Typography} from "@material-ui/core";

import TweetComponent from '../../components/TweetComponent/TweetComponent';
import {useUserPageStyles} from "./UserPageStyles";
import AddTweetModal from "../../components/AddTweetModal/AddTweetModal";
import Spinner from "../../components/Spinner/Spinner";
import {TweetResponse} from "../../store/types/tweet";

interface UserPageTweetsProps {
    tweets?: TweetResponse[];
    isTweetsLoading: boolean;
    activeTab: number;
    userProfileId?: number;
    myProfileId?: number;
    username?: string;
}

const UserPageTweets: FC<UserPageTweetsProps> = (
    {
        tweets,
        isTweetsLoading,
        activeTab,
        userProfileId,
        myProfileId,
        username
    }
): ReactElement => {
    const classes = useUserPageStyles();
    const [visibleAddTweet, setSetVisibleAddTweet] = useState<boolean>(false);

    const handleClickOpenAddTweet = (): void => {
        setSetVisibleAddTweet(true);
    };

    const onCloseAddTweet = (): void => {
        setSetVisibleAddTweet(false);
    };

    const renderTweets = () => {
        if (tweets?.length === 0 && activeTab === 0 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId ? (
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
                    {userProfileId === myProfileId ? (
                        <Button
                            className={classes.button}
                            onClick={handleClickOpenAddTweet}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            Send Tweet
                        </Button>
                    ) : null}
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 1 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId ? (
                            "You haven’t any replies yet"
                        ) : (
                            `@${username} hasn’t any replies`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId ? (
                            "When you reply Tweets, they will show up here."
                        ) : (
                            "When they do, their replies show up here."
                        )}
                    </Typography>
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 2 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId ? (
                            "You haven’t Tweeted any photos or videos yet"
                        ) : (
                            `@${username} hasn’t Tweeted any photos or videos`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId ? (
                            "When you send Tweets with photos or videos in them, it will show up here."
                        ) : (
                            "When they do, their media will show up here."
                        )}
                    </Typography>
                    {userProfileId === myProfileId ? (
                        <Button
                            className={classes.button}
                            onClick={handleClickOpenAddTweet}
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            Tweet a photo or video
                        </Button>
                    ) : null}
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 3 && !isTweetsLoading) {
            return (
                <div className={classes.textWrapper}>
                    <Typography variant={"h5"}>
                        {userProfileId === myProfileId ? (
                            "You don’t have any likes yet"
                        ) : (
                            `@${username} hasn’t liked any Tweets`
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        {userProfileId === myProfileId ? (
                            "Tap the heart on any Tweet to show it some love. When you do, it’ll show up here."
                        ) : (
                            "When they do, those Tweets will show up here."
                        )}
                    </Typography>
                </div>
            )
        } else {
            return (
                <>
                    {tweets?.map((tweet) => (
                        <TweetComponent
                            item={tweet}
                            key={tweet.id}
                            userProfileId={userProfileId}
                            activeTab={activeTab}
                        />
                    ))}
                    {isTweetsLoading && <Spinner/>}
                </>
            );
        }
    };

    return (
        <>
            {renderTweets()}
            <AddTweetModal onClose={onCloseAddTweet} visible={visibleAddTweet}/>
        </>
    );
};

export default UserPageTweets;
