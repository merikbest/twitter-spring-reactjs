import React, {FC, useCallback, useEffect, useRef} from 'react';
import {IconButton} from '@material-ui/core';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import {ImageObj} from "../AddTweetForm/AddTweetForm";
import ImageList from "../ImageList/ImageList";
import {MediaIcon} from "../../icons";
import {useUploadImagesStyles} from "./UploadImagesStyles";

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

    const removeImage = (url: string) => {
        onChangeImages((prev) => prev.filter((obj) => obj.src !== url));
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
            <ImageList images={images} removeImage={removeImage}/>
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
