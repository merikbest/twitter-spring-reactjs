import React, {FC, ReactElement} from "react";
import TweetActionResult, {TweetActionResults} from "../../TweetActionResult/TweetActionResult";
import {useSelector} from "react-redux";
import {selectUserProfile} from "../../../store/ducks/userProfile/selectors";
import {selectUserDataId, selectUserPinnedTweetId} from "../../../store/ducks/user/selectors";

interface TweetActionsProps {
    retweetsUserIds?: number[];
    tweetId?: number;
    activeTab?: number;
}

const TweetActions: FC<TweetActionsProps> = ({retweetsUserIds, tweetId, activeTab}): ReactElement => {
    const userProfile = useSelector(selectUserProfile);
    const myProfileId = useSelector(selectUserDataId);
    const pinnedTweetId = useSelector(selectUserPinnedTweetId);
    const isTweetRetweetedByUser = retweetsUserIds?.findIndex((id) => id === userProfile?.id) !== -1;

    return (
        <>
            {isTweetRetweetedByUser && userProfile ? (
                <TweetActionResult
                    action={TweetActionResults.RETWEET}
                    text={((myProfileId === userProfile?.id) ? ("You") : (userProfile?.fullName)) + " Retweeted"}
                />
            ) : null}
            {((pinnedTweetId === tweetId || userProfile?.pinnedTweetId === tweetId) && activeTab === 0) && (
                <TweetActionResult action={TweetActionResults.PIN} text={"Pinned Tweet"}/>
            )}
        </>
    );
};

export default TweetActions;
