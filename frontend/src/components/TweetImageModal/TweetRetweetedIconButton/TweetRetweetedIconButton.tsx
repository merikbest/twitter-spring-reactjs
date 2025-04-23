import React, { memo, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { RetweetIcon, RetweetOutlinedIcon } from "../../../icons";
import { selectIsTweetRetweeted } from "../../../store/ducks/tweet/selectors";
import { retweet } from "../../../store/ducks/tweets/actionCreators";
import { useTweetRetweetedIconButtonStyles } from "./TweetRetweetedIconButtonStyles";

const TweetRetweetedIconButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const classes = useTweetRetweetedIconButtonStyles({ isTweetRetweeted });
    const { t } = useTranslation();

    const handleRetweet = (): void => {
        dispatch(retweet({ tweetId: parseInt(tweetId) }));
    };

    return (
        <div className={classes.retweetIcon}>
            <ActionIconButton
                actionText={isTweetRetweeted
                    ? t("UNDO_RETWEET", { defaultValue: "Undo Retweet" })
                    : t("RETWEET", { defaultValue: "Retweet" })}
                icon={isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
                onClick={handleRetweet}
            />
        </div>
    );
});

export default TweetRetweetedIconButton;
