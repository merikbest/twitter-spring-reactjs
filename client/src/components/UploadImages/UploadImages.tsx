import React, {FC, ReactElement, useCallback, useEffect, useRef} from 'react';
import {IconButton} from '@material-ui/core';

import {ImageObj} from "../AddTweetForm/AddTweetForm";
import {MediaIcon} from "../../icons";
import {useUploadImagesStyles} from "./UploadImagesStyles";

interface UploadImageProps {
    onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

const UploadImages: FC<UploadImageProps> = ({onChangeImages}): ReactElement => {
    const classes = useUploadImagesStyles();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChangeFileInput = useCallback((event: Event): void => {
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
            <div className={classes.icon}>
                <IconButton onClick={handleClickImage} color="primary">
                    <>{MediaIcon}</>
                </IconButton>
            </div>
            <input ref={inputRef} type="file" id="upload-input" hidden/>
        </div>
    );
};

export default UploadImages;
