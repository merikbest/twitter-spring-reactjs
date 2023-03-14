import React, { FC, memo, ReactElement } from "react";
import TweetActionResult, { TweetActionResults } from "../../TweetActionResult/TweetActionResult";
import { useSelector } from "react-redux";

import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfilePinnedTweetId
} from "../../../store/ducks/userProfile/selectors";
import { selectUserDataId, selectUserPinnedTweetId } from "../../../store/ducks/user/selectors";

interface TweetActionsProps {
    retweetsUserIds?: number[];
    tweetId?: number;
    activeTab?: number;
}

const TweetActions: FC<TweetActionsProps> = memo(({ retweetsUserIds, tweetId, activeTab }): ReactElement => {
    const userProfileId = useSelector(selectUserProfileId);
    const userProfilePinnedTweetId = useSelector(selectUserProfilePinnedTweetId);
    const fullName = useSelector(selectUserProfileFullName);
    const myProfileId = useSelector(selectUserDataId);
    const myProfilePinnedTweetId = useSelector(selectUserPinnedTweetId);
    const isTweetRetweetedByUser = retweetsUserIds?.findIndex((id) => id === userProfileId) !== -1;

    return (
        <>
            {isTweetRetweetedByUser && userProfileId ? (
                <TweetActionResult
                    action={TweetActionResults.RETWEET}
                    text={((myProfileId === userProfileId) ? ("You") : (fullName)) + " Retweeted"}
                />
            ) : null}
            {((myProfilePinnedTweetId === tweetId || userProfilePinnedTweetId === tweetId) && activeTab === 0) && (
                <TweetActionResult action={TweetActionResults.PIN} text={"Pinned Tweet"} />
            )}
        </>
    );
});

export default TweetActions;
