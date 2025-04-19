import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import TweetDeleted from "../../../components/TweetDeleted/TweetDeleted";
import Quote from "../../../components/Quote/Quote";
import { selectTweetQuote } from "../../../store/ducks/tweet/selectors";

const TweetQuote = (): ReactElement | null => {
    const quoteTweet = useSelector(selectTweetQuote);

    if (!quoteTweet) {
        return null;
    }

    return quoteTweet.isDeleted
        ? <TweetDeleted />
        : <Quote quoteTweet={quoteTweet} />;
};

export default TweetQuote;
