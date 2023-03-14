import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { HOME_TWEET } from "../../../constants/path-constants";
import { textFormatter } from "../../../util/text-formatter";
import { useTweetTextStyles } from "./TweetTextStyles";

interface TweetTextProps {
    text?: string;
    tweetId?: number;
}

const TweetText: FC<TweetTextProps> = memo(({ text, tweetId }): ReactElement => {
    const classes = useTweetTextStyles();

    return (
        <Typography variant={"body1"} className={classes.text}>
            <Link id={"handleClickTweet"} to={`${HOME_TWEET}/${tweetId}`}>
                {textFormatter(text!)}
            </Link>
        </Typography>
    );
});

export default TweetText;
