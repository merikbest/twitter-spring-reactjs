import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { LikeIcon, LikeOutlinedIcon } from "../../../icons";
import { likeTweet } from "../../../store/ducks/tweets/actionCreators";
import { useLikeIconButtonStyles } from "./LikeIconButtonStyles";

interface TweetLikeIconButtonProps {
    tweetId?: number;
    isTweetLiked?: boolean;
    likesCount?: number;
}

const LikeIconButton: FC<TweetLikeIconButtonProps> = memo(({ tweetId, isTweetLiked, likesCount }): ReactElement => {
    const classes = useLikeIconButtonStyles({ isTweetLiked: isTweetLiked });
    const dispatch = useDispatch();
    const params = useParams<{ userId: string }>();

    const handleLike = (): void => {
        dispatch(likeTweet({ tweetId: tweetId!, userId: params.userId }));
    };

    return (
        <div className={classes.likeIcon}>
            <ActionIconButton
                actionText={isTweetLiked ? "Unlike" : "Like"}
                icon={isTweetLiked ? LikeIcon : LikeOutlinedIcon}
                onClick={handleLike}
            />
            {(likesCount !== 0) && (
                <span id={"likesCount"} className={classes.likesCount}>
                    {likesCount}
                </span>
            )}
        </div>
    );
});

export default LikeIconButton;
