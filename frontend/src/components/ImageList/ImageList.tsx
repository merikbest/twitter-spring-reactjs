import React, { FC, ReactElement } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";

import { ImageObj } from "../AddTweetForm/AddTweetForm";
import { useImageListStyles } from "./ImageListStyles";
import { Image } from "../../types/common";

interface ImageListProps {
    images: Image[] | ImageObj[];
    removeImage?: (url: string) => void;
}

const ImageList: FC<ImageListProps> = ({ images, removeImage }): ReactElement | null => {
    const classes = useImageListStyles();

    if (images.length === 0) {
        return null;
    }

    return (
        <div className={classes.container}>
            {images.map((image, index) => (
                <div key={index} className={classes.item}>
                    {removeImage && (
                        <IconButton className={classes.itemRemove} onClick={(): void => removeImage(image.src)}>
                            <ClearIcon style={{ fontSize: 15 }} />
                        </IconButton>
                    )}
                    <img key={image.src} src={image.src} />
                </div>
            ))}
        </div>
    );
};

export default ImageList;
