import React, {FC, ReactElement} from 'react';
import {Typography} from "@material-ui/core";

import {useMutedWordsStyles} from "./MutedWordsStyles";

const MutedWords: FC = (): ReactElement => {
    const classes = useMutedWordsStyles();

    return (
        <>
            <div className={classes.mutedWordsInfo}>
                <Typography variant={"h4"} component={"div"}>
                    You aren’t muting any words
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    When you mute words, you won’t get any new notifications for Tweets that include them or see Tweets
                    with those words in your timeline.
                    <a
                        href={"https://help.twitter.com/using-twitter/advanced-twitter-mute-options"}
                        target="_blank"
                        className={classes.link}
                    >
                        Learn more
                    </a>
                </Typography>
            </div>
        </>
    );
};

export default MutedWords;
