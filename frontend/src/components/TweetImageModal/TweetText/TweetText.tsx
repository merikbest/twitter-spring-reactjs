import React, { memo, ReactElement } from "react";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

import { textFormatter } from "../../../util/text-formatter";
import { selectTweetText } from "../../../store/ducks/tweet/selectors";
import { useTweetTextStyles } from "./TweetTextStyles";

const TweetText = memo((): ReactElement => {
    const classes = useTweetTextStyles();
    const tweetText = useSelector(selectTweetText);

    return (
        <Typography variant={"h3"} className={classes.text}>
            {textFormatter(tweetText!)}
        </Typography>
    );
});

export default TweetText;
