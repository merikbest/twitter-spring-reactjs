import React, {FC, useCallback, useEffect, useRef} from 'react';
import {IconButton} from '@material-ui/core';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import {ImageObj} from "../AddTweetForm/AddTweetForm";
import ImageList from "../ImageList/ImageList";
import {CloseIcon, MediaIcon} from "../../icons";
import {useUploadImagesStyles} from "./UploadImagesStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";

interface UploadImageProps {
    images: ImageObj[];
    onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

const UploadImages: FC<UploadImageProps> = ({images, onChangeImages}) => {
    const classes = useUploadImagesStyles();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const removeImage = (): void => {
        onChangeImages((prev) => prev.filter((obj) => obj.src !== images[0].src));
    };

    const handleChangeFileInput = useCallback((event: Event) => {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const fileObj = new Blob([file]);
                onChangeImages((prev) => [
                    ...prev,
                    {
                        src: URL.createObjectURL(fileObj),
                        file,
                    },
                ]);
            }
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleChangeFileInput);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('change', handleChangeFileInput);
            }
        };
    }, []);

    return (
        <div>
            {/*<div className={classes.image}>*/}
            {/*    {(images.length !== 0) &&*/}
            {/*    <>*/}
            {/*        <img src={images[0].src} alt={images[0].src}/>*/}
            {/*        <IconButton className={classes.imageRemove} onClick={removeImage}>*/}
            {/*            {CloseIcon}*/}
            {/*        </IconButton>*/}
            {/*    </>*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<ImageList images={images} removeImage={removeImage}/>*/}
            <div className={classes.icon}>
                <IconButton onClick={handleClickImage} color="primary">
                    <span>{MediaIcon}</span>
                </IconButton>
            </div>

            <input ref={inputRef} type="file" id="upload-input" hidden/>
        </div>
    );
};

export default UploadImages;
