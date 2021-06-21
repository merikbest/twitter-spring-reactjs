import React, {FC, useCallback, useEffect, useRef} from 'react';
import {ImageObj} from "../AddTweetForm/AddTweetForm";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";

interface UploadProfileImageProps {
    name: string;
    image?: ImageObj;
    onChangeImage: (imageObj: ImageObj) => void
}

const UploadProfileImage: FC<UploadProfileImageProps> = ({name, image, onChangeImage}) => {
    const uploadRef = useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (uploadRef.current) {
            uploadRef.current.click();
        }
    };

    const handleChangeFileInput = useCallback((event: Event) => {
        console.log(event)
        if (event.target) {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const fileObj = new Blob([file]);
                onChangeImage({src: URL.createObjectURL(fileObj), file});
            }
        }
    }, []);

    useEffect(() => {
        if (uploadRef.current) {
            uploadRef.current.addEventListener('change', handleChangeFileInput);
        }
        return () => {
            if (uploadRef.current) {
                uploadRef.current.removeEventListener('change', handleChangeFileInput);
            }
        };
    }, []);

    return (
        <>
            {name === "wallpaper" ?
                <>
                    <IconButton onClick={handleClickImage} style={{color: "#fff"}}>
                        <PhotoCameraOutlinedIcon />
                    </IconButton>
                </> :
                <IconButton onClick={handleClickImage}
                    style={{
                        top: "38px",
                        left: "55px",
                        position: "absolute",
                        zIndex: 5,
                        color: "#fff"}}>
                    <PhotoCameraOutlinedIcon />
                </IconButton>
            }
            <input ref={uploadRef} type="file" id="upload-wallpaper-input" hidden />
        </>
    );
};

export default UploadProfileImage;
