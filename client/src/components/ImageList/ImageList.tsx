import React, {FC} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import {IconButton} from '@material-ui/core';

import {useHomeStyles} from '../../pages/Home/HomeStyles';
import {Image} from "../../store/ducks/tweets/contracts/state";
import {ImageObj} from "../AddTweetForm/AddTweetForm";

interface ImageListProps {
    images: Image[] | ImageObj[];
    classes: ReturnType<typeof useHomeStyles>;
    removeImage?: (url: string) => void;
}

const ImageList: FC<ImageListProps> = ({classes, images, removeImage}) => {

    return (
        <>
            {images.length !== 0 ?
                <div className={classes.imagesList}>
                    {images.map((image) => (
                        <div className={classes.imagesListItem}>
                            {removeImage && (
                                <IconButton
                                    className={classes.imagesListItemRemove}
                                    onClick={(): void => removeImage(image.src)}>
                                    <ClearIcon style={{fontSize: 15}}/>
                                </IconButton>
                            )}
                            <img key={image.src} src={image.src}/>
                        </div>
                    ))}
                </div> : null
            }
        </>
    );
};

export default ImageList;
