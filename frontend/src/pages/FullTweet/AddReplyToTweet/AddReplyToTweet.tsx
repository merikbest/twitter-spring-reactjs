import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Trans, useTranslation } from "react-i18next";

import { ReplyType } from "../../../types/common";
import AddTweetForm from "../../../components/AddTweetForm/AddTweetForm";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import {
    selectTweetAuthorId,
    selectTweetAuthorIsFollower,
    selectTweetAuthorUsername,
    selectTweetId,
    selectTweetReplyType
} from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";
import { PROFILE } from "../../../constants/path-constants";

const AddReplyToTweet = memo((): ReactElement | null => {
    const classes = useFullTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const myProfileId = useSelector(selectUserDataId);
    const tweetAuthorId = useSelector(selectTweetAuthorId);
    const replyType = useSelector(selectTweetReplyType);
    const tweetAuthorIsFollower = useSelector(selectTweetAuthorIsFollower);
    const tweetAuthorUsername = useSelector(selectTweetAuthorUsername);
    const { t } = useTranslation();
    const canReply = (replyType !== ReplyType.FOLLOW && replyType !== ReplyType.MENTION)
        || myProfileId === tweetAuthorId
        || (tweetAuthorIsFollower && replyType === ReplyType.FOLLOW);

    if (!canReply) {
        return null;
    }

    return (
        <>
            <Typography variant="subtitle1" className={classes.replyWrapper}>
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
                addressedId={tweetAuthorId}
                maxRows={15}
                title={t("TWEET_YOUR_REPLY", { defaultValue: "Tweet your reply" })}
                buttonName={t("REPLY", { defaultValue: "Reply" })}
            />
        </>
    );
});

export default AddReplyToTweet;
