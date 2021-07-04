import React, {FC, useState} from 'react';
import {Button, Hidden, Typography} from "@material-ui/core";

import {useHomeStyles} from "../Home/HomeStyles";
import Tweet from '../../components/Tweet/Tweet';
import {AddTweetForm} from "../../components/AddTweetForm/AddTweetForm";
import ModalBlock from "../../components/ModalBlock/ModalBlock";

interface UserPageTweetsProps {
    tweets?: any;
    classes: ReturnType<typeof useHomeStyles>;
    activeTab: number;
    userProfileId?: number;
    myProfileId?: number;
    username?: string;
}

const UserPageTweets: FC<UserPageTweetsProps> = ({tweets, classes, activeTab, userProfileId, myProfileId, username}) => {
    const [visibleAddTweet, setSetVisibleAddTweet] = useState<boolean>(false);

    const handleClickOpenAddTweet = (): void => {
        setSetVisibleAddTweet(true);
    };

    const onCloseAddTweet = (): void => {
        setSetVisibleAddTweet(false);
    };

    const renderTweets = () => {
        if (tweets?.length === 0 && activeTab === 0) {
            return (
                <div className={classes.userPageTextWrapper}>
                    <Typography className={classes.userPageTopic}>
                        {userProfileId === myProfileId ? (
                            "You haven’t any Tweets yet"
                        ) : (
                            `@${username} hasn’t any Tweets`
                        )}
                    </Typography>
                    <Typography className={classes.userPageText}>
                        {userProfileId === myProfileId ? (
                            "When you send Tweets, they will show up here."
                        ) : (
                            "When they do, their Tweets show up here."
                        )}
                    </Typography>
                    {userProfileId === myProfileId ? (
                        <Button onClick={handleClickOpenAddTweet} variant="contained" color="primary">
                            <Hidden smDown>
                                Send Tweet
                            </Hidden>
                        </Button>
                    ) : null}
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 1) {
            return (
                <div className={classes.userPageTextWrapper}>
                    <Typography className={classes.userPageTopic}>
                        {userProfileId === myProfileId ? (
                            "You haven’t any replies yet"
                        ) : (
                            `@${username} hasn’t any replies`
                        )}
                    </Typography>
                    <Typography className={classes.userPageText}>
                        {userProfileId === myProfileId ? (
                            "When you reply Tweets, they will show up here."
                        ) : (
                            "When they do, their replies show up here."
                        )}
                    </Typography>
                </div>
            )
        } else if (activeTab === 2) {
            return (
                <div className={classes.userPageTextWrapper}>
                    <Typography className={classes.userPageTopic}>
                        {userProfileId === myProfileId ? (
                            "You haven’t Tweeted any photos or videos yet"
                        ) : (
                            `@${username} hasn’t Tweeted any photos or videos`
                        )}
                    </Typography>
                    <Typography className={classes.userPageText}>
                        {userProfileId === myProfileId ? (
                            "When you send Tweets with photos or videos in them, it will show up here."
                        ) : (
                            "When they do, their media will show up here."
                        )}
                    </Typography>
                    {userProfileId === myProfileId ? (
                        <Button onClick={handleClickOpenAddTweet} variant="contained" color="primary">
                            <Hidden smDown>
                                Tweet a photo or video
                            </Hidden>
                        </Button>
                    ) : null}
                </div>
            )
        } else if (tweets?.length === 0 && activeTab === 3) {
            return (
                <div className={classes.userPageTextWrapper}>
                    <Typography className={classes.userPageTopic}>
                        {userProfileId === myProfileId ? (
                            "You don’t have any likes yet"
                        ) : (
                            `@${username} hasn’t liked any Tweets`
                        )}
                    </Typography>
                    <Typography className={classes.userPageText}>
                        {userProfileId === myProfileId ? (
                            "Tap the heart on any Tweet to show it some love. When you do, it’ll show up here."
                        ) : (
                            "When they do, those Tweets will show up here."
                        )}
                    </Typography>
                </div>
            )
        } else {
            return tweets?.map((tweet: any) => (
                <Tweet key={tweet.id} classes={classes} images={tweet.images} {...tweet} activeTab={activeTab}/>))
        }
    };

    return (
        <>
            {renderTweets()}
            <ModalBlock onClose={onCloseAddTweet} visible={visibleAddTweet}>
                <div style={{width: 550}}>
                    <AddTweetForm
                        maxRows={15}
                        classes={classes}
                        title={"What's happening?"}
                        buttonName={"Tweet"}/>
                </div>
            </ModalBlock>
        </>
    );
};

export default UserPageTweets;
