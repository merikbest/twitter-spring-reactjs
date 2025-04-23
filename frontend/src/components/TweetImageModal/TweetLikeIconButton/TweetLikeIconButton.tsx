import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { LikeIcon, LikeOutlinedIcon } from "../../../icons";
import { selectIsTweetLiked } from "../../../store/ducks/tweet/selectors";
import { likeTweet } from "../../../store/ducks/tweets/actionCreators";
import { useTweetLikeIconButtonStyles } from "./TweetLikeIconButtonStyles";

const TweetLikeIconButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const { tweetId } = useParams<{ tweetId: string }>();
    const isTweetLiked = useSelector(selectIsTweetLiked);
    const classes = useTweetLikeIconButtonStyles({ isTweetLiked });
    const { t } = useTranslation();

    const handleLike = (): void => {
        dispatch(likeTweet({ tweetId: parseInt(tweetId) }));
    };

    return (
        <div className={classes.likeIcon}>
            <ActionIconButton
                actionText={isTweetLiked
                    ? t("UNLIKE", { defaultValue: "Unlike" })
                    : t("LIKE", { defaultValue: "Like" })}
                icon={isTweetLiked ? LikeIcon : LikeOutlinedIcon}
                onClick={handleLike}
            />
        </div>
    );
});

export default TweetLikeIconButton;
