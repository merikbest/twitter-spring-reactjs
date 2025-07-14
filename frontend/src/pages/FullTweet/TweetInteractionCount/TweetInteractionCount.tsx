import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

import RetweetsCount from "./RetweetsCount";
import QuotesCount from "./QuotesCount";
import LikesCount from "./LikesCount";
import { useFullTweetStyles } from "../FullTweetStyles";
import { selectLikesCount, selectQuotesCount, selectRetweetsCount } from "../../../store/ducks/tweet/selectors";

const TweetInteractionCount = (): ReactElement | null => {
    const classes = useFullTweetStyles();
    const retweetsCount = useSelector(selectRetweetsCount);
    const quotesCount = useSelector(selectQuotesCount);
    const likesCount = useSelector(selectLikesCount);

    if (retweetsCount === 0 && quotesCount === 0 && likesCount === 0) {
        return null;
    }

    return (
        <>
            <Divider />
            <div className={classes.content}>
                <RetweetsCount />
                <QuotesCount />
                <LikesCount />
            </div>
        </>
    );
};

export default TweetInteractionCount;
