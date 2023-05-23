import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import TweetDeleted from "../../../components/TweetDeleted/TweetDeleted";
import Quote from "../../../components/Quote/Quote";
import { selectTweetQuote } from "../../../store/ducks/tweet/selectors";

const TweetQuote = (): ReactElement => {
    const quoteTweet = useSelector(selectTweetQuote);

    return (
        <>
            {quoteTweet && (
                quoteTweet.isDeleted ? (
                    <TweetDeleted />
                ) : (
                    <Quote quoteTweet={quoteTweet} />
                ))
            }
        </>
    );
};

export default TweetQuote;
