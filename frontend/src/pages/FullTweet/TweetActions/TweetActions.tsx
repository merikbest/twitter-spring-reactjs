import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TweetActionResult, { TweetActionResults } from "../../../components/TweetActionResult/TweetActionResult";
import { selectIsTweetRetweeted, selectTweetId } from "../../../store/ducks/tweet/selectors";
import { selectUserPinnedTweetId } from "../../../store/ducks/user/selectors";

const TweetActions = memo((): ReactElement => {
    const tweetId = useSelector(selectTweetId);
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const pinnedTweetId = useSelector(selectUserPinnedTweetId);
    const { t } = useTranslation();

    return (
        <>
            {isTweetRetweeted && (
                <TweetActionResult
                    action={TweetActionResults.RETWEET}
                    text={t("YOU_RETWEETED", { defaultValue: "You Retweeted" })}
                />
            )}
            {(pinnedTweetId === tweetId) && (
                <TweetActionResult
                    action={TweetActionResults.PIN}
                    text={t("PINNED_TWEET", { defaultValue: "Pinned Tweet" })}
                />
            )}
        </>
    );
});

export default TweetActions;
