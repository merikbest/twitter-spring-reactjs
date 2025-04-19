import React, { memo, ReactElement, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useRetweetIconButtonStyles } from "./RetweetIconButtonStyles";
import { selectIsTweetRetweeted } from "../../../store/ducks/tweet/selectors";
import { RetweetIcon, RetweetOutlinedIcon } from "../../../icons";
import { retweet } from "../../../store/ducks/tweets/actionCreators";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";

const RetweetIconButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const classes = useRetweetIconButtonStyles({ isTweetRetweeted });
    const { t } = useTranslation();

    const handleRetweet = useCallback(() => {
        if (tweetId) {
            dispatch(retweet({ tweetId: parseInt(tweetId) }));
        }
    }, [dispatch, tweetId]);

    return (
        <div className={classes.retweetIcon}>
            <ActionIconButton
                actionText={isTweetRetweeted
                    ? t("UNDO_RETWEET", { defaultValue: "Undo Retweet" })
                    : t("RETWEET", { defaultValue: "Retweet" })}
                onClick={handleRetweet}
                icon={isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
            />
        </div>
    );
});

export default RetweetIconButton;
