import React, { FC, memo, ReactElement } from "react";
import TweetActionResult, { TweetActionResults } from "../../TweetActionResult/TweetActionResult";
import { useSelector } from "react-redux";

import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfilePinnedTweetId
} from "../../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../../store/ducks/user/selectors";

interface TweetActionsProps {
    retweetsUserIds?: number[];
    tweetId?: number;
    activeTab?: number;
}

const TweetActions: FC<TweetActionsProps> = memo(({ retweetsUserIds = [], tweetId, activeTab }): ReactElement | null => {
    const userProfileId = useSelector(selectUserProfileId);
    const userProfilePinnedTweetId = useSelector(selectUserProfilePinnedTweetId);
    const fullName = useSelector(selectUserProfileFullName);
    const myProfileId = useSelector(selectUserDataId);

    const isTweetRetweetedByUser = retweetsUserIds.includes(userProfileId!);
    const isOwnProfile = myProfileId === userProfileId;
    const isPinnedTweet = userProfilePinnedTweetId === tweetId;

    if (activeTab !== 0) {
        return null;
    }

    return (
        <>
            {(isTweetRetweetedByUser && userProfileId) && (
                <TweetActionResult
                    action={TweetActionResults.RETWEET}
                    text={`${isOwnProfile ? "You" : fullName} Retweeted`}
                />
            )}
            {isPinnedTweet && <TweetActionResult action={TweetActionResults.PIN} text="Pinned Tweet" />}
        </>
    );
});

export default TweetActions;
