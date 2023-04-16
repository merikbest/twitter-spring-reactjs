import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router-dom";

import { useFullTweetStyles } from "../../FullTweetStyles";
import { selectQuotesCount } from "../../../../store/ducks/tweet/selectors";
import { QUOTES } from "../../../../constants/path-constants";

const QuotesCount = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const quotesCount = useSelector(selectQuotesCount);
    const history = useHistory();
    const params = useParams<{ id: string }>();

    const onClickQuotes = (): void => {
        history.push(`${QUOTES}/${params.id}`);
    };

    return (
        <>
            {(quotesCount !== 0) && (
                <span className={classes.interactionCount} onClick={onClickQuotes}>
                    <div className={classes.contentItem}>
                        <Typography variant={"h6"} component={"span"}>
                            {quotesCount}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            Quote Tweets
                        </Typography>
                    </div>
                </span>
            )}
        </>
    );
});

export default QuotesCount;
