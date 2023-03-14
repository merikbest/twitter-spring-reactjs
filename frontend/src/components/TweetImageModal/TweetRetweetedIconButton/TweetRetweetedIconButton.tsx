import React, { memo, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { RetweetIcon, RetweetOutlinedIcon } from "../../../icons";
import { selectIsTweetRetweeted } from "../../../store/ducks/tweet/selectors";
import { retweet } from "../../../store/ducks/tweets/actionCreators";
import { useTweetRetweetedIconButtonStyles } from "./TweetRetweetedIconButtonStyles";

const TweetRetweetedIconButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const classes = useTweetRetweetedIconButtonStyles({ isTweetRetweeted });

    const handleRetweet = (): void => {
        dispatch(retweet({ tweetId: parseInt(params.id) }));
    };

    return (
        <div className={classes.retweetIcon}>
            <ActionIconButton
                actionText={isTweetRetweeted ? "Undo Retweet" : "Retweet"}
                icon={isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
                onClick={handleRetweet}
            />
        </div>
    );
});

export default TweetRetweetedIconButton;
