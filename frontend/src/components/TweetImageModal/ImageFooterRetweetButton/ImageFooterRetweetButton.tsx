import React, { memo, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { RetweetIcon, RetweetOutlinedIcon } from "../../../icons";
import { retweet } from "../../../store/ducks/tweets/actionCreators";
import { selectIsTweetRetweeted, selectRetweetsCount } from "../../../store/ducks/tweet/selectors";
import { useImageFooterButtonStyles } from "../ImageFooterButtonStyles";

const ImageFooterRetweetButton = memo((): ReactElement => {
    const classes = useImageFooterButtonStyles();
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const retweetsCount = useSelector(selectRetweetsCount);

    const handleRetweet = (): void => {
        dispatch(retweet({ tweetId: parseInt(params.id) }));
    };

    return (
        <div className={classes.imageFooterIcon}>
            <IconButton onClick={handleRetweet} size="small">
                {isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
            </IconButton>
            {retweetsCount !== 0 && (
                <Typography id={"retweetsCount"} variant={"body1"} component={"span"}>
                    {retweetsCount}
                </Typography>
            )}
        </div>
    );
});

export default ImageFooterRetweetButton;
