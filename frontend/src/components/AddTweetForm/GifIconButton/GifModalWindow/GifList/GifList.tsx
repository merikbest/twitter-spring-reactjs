import React, { FC, ReactElement } from "react";
import { ImageList, ImageListItem } from "@material-ui/core";
import { useSelector } from "react-redux";

import { useGifModalWindowStyles } from "../GifModalWindowStyles";
import { GiphyDataProps } from "../../../../../types/tweet";
import { selectGifs } from "../../../../../store/ducks/addTweetForm/selector";

interface GifListProps {
    onClickGif: (gif: GiphyDataProps) => void;
}

const GifList: FC<GifListProps> = ({ onClickGif }): ReactElement => {
    const classes = useGifModalWindowStyles();
    const gifs = useSelector(selectGifs);

    return (
        <ImageList cols={2} rowHeight={150}>
            {gifs.map((gif) => (
                    <ImageListItem key={gif.id} className={classes.imageListItem} onClick={() => onClickGif(gif)}>
                        <img src={gif.images.downsized.url} alt={gif.title} />
                    </ImageListItem>
                )
            )}
        </ImageList>
    );
};

export default GifList;
