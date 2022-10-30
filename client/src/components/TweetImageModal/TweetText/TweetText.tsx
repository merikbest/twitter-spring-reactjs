import React, {FC, memo, ReactElement} from "react";
import Typography from "@material-ui/core/Typography";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {useSelector} from "react-redux";

import {textFormatter} from "../../../util/textFormatter";
import {selectTweetText} from "../../../store/ducks/tweet/selectors";

interface TweetTextProps {
    classes: ClassNameMap<string>
}

const TweetText: FC<TweetTextProps> = memo(({classes}): ReactElement => {
    const tweetText = useSelector(selectTweetText);

    return (
        <Typography variant={"h3"} className={classes.text}>
            {textFormatter(tweetText!)}
        </Typography>
    );
});

export default TweetText;
