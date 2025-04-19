import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useFullTweetStyles } from "../../FullTweetStyles";
import { selectQuotesCount } from "../../../../store/ducks/tweet/selectors";
import { QUOTES } from "../../../../constants/path-constants";

const QuotesCount = memo((): ReactElement | null => {
    const classes = useFullTweetStyles();
    const quotesCount = useSelector(selectQuotesCount);
    const history = useHistory();
    const { tweetId } = useParams<{ tweetId: string }>();
    const { t } = useTranslation();

    const onClickQuotes = (): void => {
        history.push(`${QUOTES}/${tweetId}`);
    };

    if (quotesCount === 0) {
        return null;
    }

    return (
        <span className={classes.interactionCount} onClick={onClickQuotes}>
            <div className={classes.contentItem}>
                <Typography variant="h6" component="span">
                    {quotesCount}
                </Typography>
                <Typography variant="subtitle1" component="span">
                    {t("QUOTE_TWEETS", { defaultValue: "Quote Tweets" })}
                </Typography>
            </div>
        </span>
    );
});

export default QuotesCount;
