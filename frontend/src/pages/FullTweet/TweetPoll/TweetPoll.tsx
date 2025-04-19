import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import VoteComponent from "../../../components/VoteComponent/VoteComponent";
import { selectTweetId, selectTweetPoll } from "../../../store/ducks/tweet/selectors";

const TweetPoll = (): ReactElement | null => {
    const tweetId = useSelector(selectTweetId);
    const poll = useSelector(selectTweetPoll);

    if (!poll) {
        return null;
    }

    return <VoteComponent tweetId={tweetId!} poll={poll} />;
};

export default TweetPoll;
