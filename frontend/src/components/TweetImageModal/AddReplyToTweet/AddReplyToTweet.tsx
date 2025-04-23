import React, { ReactElement } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";

import { PROFILE } from "../../../constants/path-constants";
import AddTweetForm from "../../AddTweetForm/AddTweetForm";
import { selectTweetAuthorId, selectTweetAuthorUsername, selectTweetId } from "../../../store/ducks/tweet/selectors";
import { useAddReplyToTweetStyles } from "./AddReplyToTweetStyles";

const AddReplyToTweet = (): ReactElement => {
    const classes = useAddReplyToTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const tweetAuthorId = useSelector(selectTweetAuthorId);
    const tweetAuthorUsername = useSelector(selectTweetAuthorUsername);
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="subtitle1" component="div" className={classes.replyWrapper}>
                <Trans
                    i18nKey="REPLYING_TO_USER"
                    values={{ username: tweetAuthorUsername }}
                    components={{ profileLink: <Link to={`${PROFILE}/${tweetAuthorId}`} /> }}
                >
                    Replying to <Link to={`${PROFILE}/${tweetAuthorId}`}>@{tweetAuthorUsername}</Link>
                </Trans>
            </Typography>
            <AddTweetForm
                tweetId={tweetId}
                addressedUsername={tweetAuthorUsername}
                maxRows={15}
                title={t("TWEET_YOUR_REPLY", { defaultValue: "Tweet your reply" })}
                buttonName={t("REPLY", { defaultValue: "Reply" })}
            />
        </>
    );
};

export default AddReplyToTweet;
