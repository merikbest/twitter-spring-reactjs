import React, { FC, ReactElement } from "react";
import { ImageList, ImageListItem } from "@material-ui/core";

import { useGifModalWindowStyles } from "../GifModalWindowStyles";
import { GiphyDataProps } from "../../../../../types/tweet";

interface GifListProps {
    gifs: GiphyDataProps[];
    onClickGif: (gif: GiphyDataProps) => void;
}

const GifList: FC<GifListProps> = ({ gifs, onClickGif }): ReactElement => {
    const classes = useGifModalWindowStyles();

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
