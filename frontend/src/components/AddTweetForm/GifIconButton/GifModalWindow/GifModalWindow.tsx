import React, { FC, ReactElement } from "react";
import { Dialog, DialogContent, ImageList, ImageListItem, ImageListItemBar, Typography } from "@material-ui/core";

import DialogTitleComponent from "../../../DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useGifModalWindowStyles } from "./GifModalWindowStyles";

interface GifModalWindowProps {
    visible: boolean;
    onClose: () => void;
}

const GifModalWindow: FC<GifModalWindowProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useGifModalWindowStyles();
    const gifs = [
        { id: 1, title: "Agree", imgSrc: "https://media1.giphy.com/media/WJjLyXCVvro2I/giphy_s.gif" },
        { id: 2, title: "Applause", imgSrc: "https://media.tenor.com/images/5656c0cd4de11821336ab2bb920d383a/raw" },
        { id: 3, title: "Dance", imgSrc: "https://media.tenor.com/images/3b39c942b33fc56ac8c821396393b9ae/raw" },
        { id: 4, title: "Eww", imgSrc: "https://media3.giphy.com/media/10FHR5A4cXqVrO/giphy_s.gif" },
        { id: 5, title: "Facepalm", imgSrc: "https://media.tenor.com/images/1b58b8869489f53b36407f357faf0168/raw" }
    ];

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitleComponent onClose={onClose} borderBottom />
            <DialogContent className={globalClasses.dialogContent}>
                <ImageList cols={2} rowHeight={150}>
                    {gifs.map((gif) => (
                            <ImageListItem key={gif.id} className={classes.imageListItem}>
                                <img alt="" src={gif.imgSrc} />
                                <ImageListItemBar
                                    title={<Typography variant={"h5"} component={"div"}>{gif.title}</Typography>}
                                />
                            </ImageListItem>
                        )
                    )}
                </ImageList>
            </DialogContent>
        </Dialog>
    );
};

export default GifModalWindow;
