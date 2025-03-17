import React, { FC, memo, ReactElement } from "react";
import TweetActionResult, { TweetActionResults } from "../../TweetActionResult/TweetActionResult";
import { useSelector } from "react-redux";

import {
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfilePinnedTweetId
} from "../../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { TweetType } from "../../../types/common";

interface TweetActionsProps {
    tweetId?: number;
    tweetType?: TweetType;
    activeTab?: number;
}

const TweetActions: FC<TweetActionsProps> = memo(({ tweetId, tweetType, activeTab }): ReactElement | null => {
    const userProfileId = useSelector(selectUserProfileId);
    const pinnedTweetId = useSelector(selectUserProfilePinnedTweetId);
    const fullName = useSelector(selectUserProfileFullName);
    const myProfileId = useSelector(selectUserDataId);

    if (activeTab !== 0) {
        return null;
    }

    return (
        <>
            {(tweetType === TweetType.RETWEET) && (
                <TweetActionResult
                    action={TweetActionResults.RETWEET}
                    text={`${(myProfileId === userProfileId) ? "You" : fullName} Retweeted`}
                />
            )}
            {(pinnedTweetId === tweetId) && <TweetActionResult action={TweetActionResults.PIN} text="Pinned Tweet" />}
        </>
    );
});

export default TweetActions;
