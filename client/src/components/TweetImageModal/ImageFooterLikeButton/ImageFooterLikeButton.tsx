import React, {memo, ReactElement} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "@material-ui/core";

import {LikeIcon, LikeOutlinedIcon} from "../../../icons";
import {likeTweet} from "../../../store/ducks/tweets/actionCreators";
import {selectIsTweetLiked, selectLikedTweetsCount} from "../../../store/ducks/tweet/selectors";
import {useImageFooterButtonStyles} from "../ImageFooterButtonStyles";

const ImageFooterLikeButton = memo((): ReactElement => {
    const classes = useImageFooterButtonStyles()
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const isTweetLiked = useSelector(selectIsTweetLiked);
    const likedTweetsCount = useSelector(selectLikedTweetsCount);

    const handleLike = (): void => {
        dispatch(likeTweet({tweetId: parseInt(params.id)}));
    };

    return (
        <div className={classes.imageFooterIcon}>
            <IconButton onClick={handleLike} size="small">
                {isTweetLiked ? LikeIcon : LikeOutlinedIcon}
            </IconButton>
            {likedTweetsCount && (
                <Typography id={"likedTweetsCount"} variant={"body1"} component={"span"}>
                    {likedTweetsCount}
                </Typography>
            )}
        </div>
    );
});

export default ImageFooterLikeButton;
