import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

import RetweetsCount from "./RetweetsCount/RetweetsCount";
import QuotesCount from "./QuotesCount/QuotesCount";
import LikesCount from "./LikesCount/LikesCount";
import { useFullTweetStyles } from "../FullTweetStyles";
import { selectLikesCount, selectRetweetsCount } from "../../../store/ducks/tweet/selectors";

const TweetInteractionCount = (): ReactElement => {
    const classes = useFullTweetStyles();
    const retweetsCount = useSelector(selectRetweetsCount);
    const likesCount = useSelector(selectLikesCount);

    return (
        <>
            {(retweetsCount !== 0 || likesCount !== 0) && (
                <>
                    <Divider />
                    <div className={classes.content}>
                        <RetweetsCount />
                        <QuotesCount />
                        <LikesCount />
                    </div>
                </>
            )}
        </>
    );
};

export default TweetInteractionCount;
