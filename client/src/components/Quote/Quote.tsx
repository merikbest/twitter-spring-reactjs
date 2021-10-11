import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import {Typography} from "@material-ui/core";

import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {formatDate} from "../../util/formatDate";
import {textFormatter} from "../../util/textFormatter";
import {useQuoteStyles} from "./QuoteStyles";
import {Tweet} from "../../store/ducks/tweets/contracts/state";

interface QuoteProps {
    quoteTweet: Tweet;
    isTweetQuoted?: boolean;
    isFullTweet?: boolean;
}

const Quote: FC<QuoteProps> = ({quoteTweet, isTweetQuoted, isFullTweet}): ReactElement => {
    const classes = useQuoteStyles({isTweetQuoted, isFullTweet});

    return (
        <Link to={`/home/tweet/${quoteTweet.id}`} className={classes.quoteTweetLink}>
            <div className={classes.quoteTweetContainer}>
                <div className={classes.quoteTweetWrapper}>
                    <Avatar
                        className={classes.quoteTweetAvatar}
                        alt={`avatar ${quoteTweet.user.avatar?.id}`}
                        src={quoteTweet.user.avatar?.src ? quoteTweet.user.avatar?.src : DEFAULT_PROFILE_IMG}
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
};

export default Quote;
