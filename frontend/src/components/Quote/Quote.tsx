import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";

import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import { formatDate } from "../../util/format-date-helper";
import { textFormatter } from "../../util/text-formatter";
import { useQuoteStyles } from "./QuoteStyles";
import { QuoteTweetResponse } from "../../types/tweet";
import { HOME_TWEET } from "../../constants/path-constants";

interface QuoteProps {
    quoteTweet: QuoteTweetResponse;
}

const Quote: FC<QuoteProps> = memo(({ quoteTweet }): ReactElement => {
    const classes = useQuoteStyles();

    return (
        <Link to={`${HOME_TWEET}/${quoteTweet.id}`} className={classes.quoteTweetLink}>
            <div className={classes.quoteTweetContainer}>
                <div className={classes.quoteTweetWrapper}>
                    <Avatar
                        className={classes.quoteTweetAvatar}
                        alt={`avatar ${quoteTweet.user.avatar}`}
                        src={quoteTweet.user.avatar ?? DEFAULT_PROFILE_IMG}
                    />
                    <Typography component={"span"} className={classes.quoteTweetFullName}>
                        {quoteTweet.user.fullName}
                    </Typography>
                    <Typography component={"span"} className={classes.quoteTweetUsername}>
                        @{quoteTweet.user.username}
                    </Typography>&nbsp;
                    <Typography component={"span"} className={classes.quoteTweetUsername}>·</Typography>&nbsp;
                    <Typography component={"span"} className={classes.quoteTweetUsername}>
                        {formatDate(new Date(quoteTweet.dateTime))}
                    </Typography>
                </div>
                <Typography component={"div"} className={classes.quoteTweetText}>
                    {textFormatter(quoteTweet.text)}
                </Typography>
            </div>
        </Link>
    );
});

export default Quote;
