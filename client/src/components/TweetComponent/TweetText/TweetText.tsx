import React, {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {HOME_TWEET} from "../../../util/pathConstants";
import {textFormatter} from "../../../util/textFormatter";

interface TweetTextProps {
    classes: ClassNameMap<string>;
    text?: string;
    tweetId?: number;
}

const TweetText: FC<TweetTextProps> = memo(({classes, text, tweetId}): ReactElement => {
    return (
        <Typography variant={"body1"} className={classes.text}>
            <Link id={"handleClickTweet"} to={`${HOME_TWEET}/${tweetId}`}>
                {textFormatter(text!)}
            </Link>
        </Typography>
    );
});

export default TweetText;
