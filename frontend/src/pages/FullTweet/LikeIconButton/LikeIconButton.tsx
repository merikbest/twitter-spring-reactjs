import React, { memo, ReactElement, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { LikeIcon, LikeOutlinedIcon } from "../../../icons";
import { useLikeIconButtonStyles } from "./LikeIconButtonStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { likeTweet } from "../../../store/ducks/tweets/actionCreators";
import { selectIsTweetLiked } from "../../../store/ducks/tweet/selectors";

const LikeIconButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const isTweetLiked = useSelector(selectIsTweetLiked);
    const classes = useLikeIconButtonStyles({ isTweetLiked });
    const { t } = useTranslation();

    const handleLike = useCallback(() => {
        if (tweetId) {
            dispatch(likeTweet({ tweetId: parseInt(tweetId) }));
        }
    }, [dispatch, tweetId]);

    return (
        <div className={classes.likeIcon}>
            <ActionIconButton
                actionText={isTweetLiked
                    ? t("UNLIKE", { defaultValue: "Unlike" })
                    : t("LIKE", { defaultValue: "Like" })}
                onClick={handleLike}
                icon={isTweetLiked ? LikeIcon : LikeOutlinedIcon}
            />
        </div>
    );
});

export default LikeIconButton;
