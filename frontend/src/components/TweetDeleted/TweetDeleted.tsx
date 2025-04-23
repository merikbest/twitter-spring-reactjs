import React, { memo, ReactElement } from "react";
import { Link as MuiLink } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useTweetDeletedStyles } from "./TweetDeletedStyles";
import { TWITTER_NOTICES } from "../../constants/url-constants";

const TweetDeleted = memo((): ReactElement => {
    const classes = useTweetDeletedStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            {t("THIS_TWEET_WAS_DELETED", { defaultValue: "This Tweet was deleted by the Tweet author." })}
            {" "}
            <MuiLink href={TWITTER_NOTICES} target="_blank" rel="noopener">
                {t("LEARN_MORE", { defaultValue: "Learn more" })}
            </MuiLink>
        </div>
    );
});

export default TweetDeleted;
