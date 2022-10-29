import React, {FC, memo, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {LikeIcon, LikeOutlinedIcon} from "../../../icons";
import {TweetResponse} from "../../../store/types/tweet";
import {likeTweet} from "../../../store/ducks/tweets/actionCreators";

interface TweetLikeIconButtonProps {
    classes: ClassNameMap<string>;
    tweet?: TweetResponse;
}

const LikeIconButton: FC<TweetLikeIconButtonProps> = memo(({classes, tweet}): ReactElement => {
    const dispatch = useDispatch();

    const handleLike = (): void => {
        dispatch(likeTweet(tweet!.id));
    };

    return (
        <div className={classes.likeIcon}>
            <ActionIconButton
                actionText={tweet?.isTweetLiked ? "Unlike" : "Like"}
                icon={tweet?.isTweetLiked ? LikeIcon : LikeOutlinedIcon}
                onClick={handleLike}
            />
            {(tweet?.likedTweetsCount !== 0) && <span id={"likedTweetsCount"}>{tweet?.likedTweetsCount}</span>}
        </div>
    );
});

export default LikeIconButton;
