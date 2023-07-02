import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import { selectTweetGifImage } from "../../../store/ducks/tweet/selectors";
import GifImage from "../../../components/GifImage/GifImage";

const TweetGif: FC = (): ReactElement | null => {
    const gifImage = useSelector(selectTweetGifImage);
    return (gifImage ? <GifImage gifImage={gifImage} /> : null);
};

export default TweetGif;
