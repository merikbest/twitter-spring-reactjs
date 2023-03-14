import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { LikeIcon, LikeOutlinedIcon } from "../../../icons";
import { selectIsTweetLiked } from "../../../store/ducks/tweet/selectors";
import { likeTweet } from "../../../store/ducks/tweets/actionCreators";
import { useTweetLikeIconButtonStyles } from "./TweetLikeIconButtonStyles";

const TweetLikeIconButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const isTweetLiked = useSelector(selectIsTweetLiked);
    const classes = useTweetLikeIconButtonStyles({ isTweetLiked });

    const handleLike = (): void => {
        dispatch(likeTweet({ tweetId: parseInt(params.id) }));
    };

    return (
        <div className={classes.likeIcon}>
            <ActionIconButton
                actionText={isTweetLiked ? "Unlike" : "Like"}
                icon={isTweetLiked ? LikeIcon : LikeOutlinedIcon}
                onClick={handleLike}
            />
        </div>
    );
});

export default TweetLikeIconButton;
