import React, { memo, ReactElement } from "react";
import { Link as MuiLink } from "@material-ui/core";

import { useTweetDeletedStyles } from "./TweetDeletedStyles";
import { TWITTER_NOTICES } from "../../constants/url-constants";

const TweetDeleted = memo((): ReactElement => {
    const classes = useTweetDeletedStyles();

    return (
        <div className={classes.container}>
            This Tweet was deleted by the Tweet author.{" "}
            <MuiLink href={TWITTER_NOTICES} target="_blank" rel="noopener">
                Learn more
            </MuiLink>
        </div>
    );
});

export default TweetDeleted;
