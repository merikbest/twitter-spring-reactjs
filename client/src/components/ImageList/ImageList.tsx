import React, {FC} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import {IconButton} from '@material-ui/core';

import {useHomeStyles} from '../../pages/Home/HomeStyles';

interface ImageListProps {
    images: string[];
    classes: ReturnType<typeof useHomeStyles>;
    removeImage?: (url: string) => void;
}

const ImageList: FC<ImageListProps> = ({classes, images, removeImage}) => {

    return (
        <>
            {images.length !== 0 ?
                <div className={classes.imagesList}>
                    {images.map((url) => (
                        <div className={classes.imagesListItem}>
                            {removeImage && (
                                <IconButton
                                    className={classes.imagesListItemRemove}
                                    onClick={(): void => removeImage(url)}>
                                    <ClearIcon style={{fontSize: 15}}/>
                                </IconButton>
                            )}
                            <img key={url} src={url}/>
                        </div>
                    ))}
                </div> : null
            }
        </>
    );
};

export default ImageList;
