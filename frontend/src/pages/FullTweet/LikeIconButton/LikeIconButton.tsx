import React, { memo, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LikeIcon, LikeOutlinedIcon } from "../../../icons";
import { useLikeIconButtonStyles } from "./LikeIconButtonStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { likeTweet } from "../../../store/ducks/tweets/actionCreators";
import { selectIsTweetLiked } from "../../../store/ducks/tweet/selectors";

const LikeIconButton = memo((): ReactElement => {
    const isTweetLiked = useSelector(selectIsTweetLiked);
    const classes = useLikeIconButtonStyles({ isTweetLiked: isTweetLiked! });
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();

    const handleLike = (): void => {
        dispatch(likeTweet({ tweetId: parseInt(params.id) }));
    };

    return (
        <div className={classes.likeIcon}>
            <ActionIconButton
                actionText={isTweetLiked ? "Unlike" : "Like"}
                onClick={handleLike}
                icon={isTweetLiked ? LikeIcon : LikeOutlinedIcon}
            />
        </div>
    );
});

export default LikeIconButton;
