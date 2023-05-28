import React, { FC, ReactElement } from "react";
import { ImageList, ImageListItem, ImageListItemBar, Typography } from "@material-ui/core";

import { useGifModalWindowStyles } from "../GifModalWindowStyles";

interface GifTopicsProps {
    onClickGifTopic: (topic: string) => void;
}

const gifsPreview = [
    { id: 1, title: "Cats", imgSrc: "https://media4.giphy.com/media/3o85xoi6nNqJQJ95Qc/giphy_s.gif" },
    { id: 2, title: "Dogs", imgSrc: "https://media2.giphy.com/media/V6vNqIGP1RiMEwmMGV/giphy-downsized_s.gif" },
    { id: 3, title: "Hug", imgSrc: "https://media4.giphy.com/media/EvYHHSntaIl5m/480w_s.jpg" },
    { id: 4, title: "Facepalm", imgSrc: "https://media.tenor.com/images/1b58b8869489f53b36407f357faf0168/raw" },
    { id: 5, title: "OMG", imgSrc: "https://media0.giphy.com/media/tkApIfibjeWt1ufWwj/480w_s.jpg" },
    { id: 6, title: "IDK", imgSrc: "https://media3.giphy.com/media/ma7VlDSlty3EA/480w_s.jpg" },
    { id: 7, title: "Agree", imgSrc: "https://media1.giphy.com/media/WJjLyXCVvro2I/giphy_s.gif" },
    { id: 8, title: "Applause", imgSrc: "https://media.tenor.com/images/5656c0cd4de11821336ab2bb920d383a/raw" },
    { id: 9, title: "Dance", imgSrc: "https://media.tenor.com/images/3b39c942b33fc56ac8c821396393b9ae/raw" },
    { id: 10, title: "Eww", imgSrc: "https://media3.giphy.com/media/10FHR5A4cXqVrO/giphy_s.gif" }
];

const GifTopics: FC<GifTopicsProps> = ({ onClickGifTopic }): ReactElement => {
    const classes = useGifModalWindowStyles();

    return (
        <ImageList cols={2} rowHeight={150}>
            {gifsPreview.map((gif) => (
                    <ImageListItem
                        key={gif.id}
                        className={classes.imageListItem}
                        onClick={() => onClickGifTopic(gif.title)}
                    >
                        <img alt="" src={gif.imgSrc} />
                        <ImageListItemBar
                            title={<Typography variant={"h5"} component={"div"}>{gif.title}</Typography>}
                        />
                    </ImageListItem>
                )
            )}
        </ImageList>
    );
};

export default GifTopics;
