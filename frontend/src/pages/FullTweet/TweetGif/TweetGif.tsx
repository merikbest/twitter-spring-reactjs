import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import { selectTweetGifImage } from "../../../store/ducks/tweet/selectors";
import GifImage from "../../../components/GifImage/GifImage";

const TweetGif: FC = (): ReactElement => {
    const gifImage = useSelector(selectTweetGifImage);
    return <GifImage gifImage={gifImage} />;
};

export default TweetGif;
