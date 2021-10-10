import React, {FC, useCallback, useEffect, useRef} from 'react';
import {ImageObj} from "../AddTweetForm/AddTweetForm";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";

interface UploadProfileImageProps {
    setupProfile?: boolean;
    name: string;
    image?: ImageObj;
    onChangeImage: (imageObj: ImageObj) => void
}

const UploadProfileImage: FC<UploadProfileImageProps> = ({setupProfile, name, image, onChangeImage}) => {
    const uploadRef = useRef<HTMLInputElement>(null);

    const handleClickImage = (): void => {
        if (uploadRef.current) {
            uploadRef.current.click();
        }
    };

    const handleChangeFileInput = useCallback((event: Event) => {
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
                        <PhotoCameraOutlinedIcon/>
                    </IconButton>
                    <input ref={uploadRef} type="file" id="upload-wallpaper-input" hidden/>
                </> :
                <>
                    <IconButton
                        onClick={handleClickImage}
                        style={{
                            top: setupProfile ? 67 : 38,
                            left: setupProfile ? 68 : 55,
                            position: "absolute",
                            zIndex: 5,
                            color: "#fff"
                        }}
                    >
                        <PhotoCameraOutlinedIcon/>
                    </IconButton>
                    <input ref={uploadRef} type="file" id="upload-avatar-input" hidden/>
                </>
            }
        </>
    );
};

export default UploadProfileImage;
