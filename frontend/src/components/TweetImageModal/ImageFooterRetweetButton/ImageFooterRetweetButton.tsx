import React, { memo, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RetweetIcon, RetweetOutlinedIcon } from "../../../icons";
import { retweet } from "../../../store/ducks/tweets/actionCreators";
import { selectIsTweetRetweeted, selectRetweetsCount } from "../../../store/ducks/tweet/selectors";
import ImageFooterButton from "../ImageFooterButton/ImageFooterButton";

const ImageFooterRetweetButton = memo((): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const isTweetRetweeted = useSelector(selectIsTweetRetweeted);
    const retweetsCount = useSelector(selectRetweetsCount);

    const handleRetweet = (): void => {
        dispatch(retweet({ tweetId: parseInt(params.id) }));
    };

    return (
        <ImageFooterButton
            id={"retweetsCount"}
            icon={isTweetRetweeted ? RetweetIcon : RetweetOutlinedIcon}
            count={retweetsCount ?? 0}
            onClick={handleRetweet}
        />
    );
});

export default ImageFooterRetweetButton;
