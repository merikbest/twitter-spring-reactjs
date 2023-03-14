import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

import RetweetsCount from "./RetweetsCount/RetweetsCount";
import QuotesCount from "./QuotesCount/QuotesCount";
import LikesCount from "./LikesCount/LikesCount";
import { useFullTweetStyles } from "../FullTweetStyles";
import { selectLikedTweetsCount, selectRetweetsCount } from "../../../store/ducks/tweet/selectors";

const TweetInteractionCount = (): ReactElement => {
    const classes = useFullTweetStyles();
    const likedTweetsCount = useSelector(selectLikedTweetsCount);
    const retweetsCount = useSelector(selectRetweetsCount);

    return (
        <>
            {(retweetsCount !== 0 || likedTweetsCount !== 0) && (
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
