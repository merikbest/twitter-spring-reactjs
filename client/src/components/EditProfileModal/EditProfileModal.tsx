import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Avatar} from "@material-ui/core";
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

import TweeterInput from "./TweetInput/TweeterInput";
import "./EditProfileModalStyles.scss";
import {ImageObj} from "../AddTweetForm/AddTweetForm";

interface EditProfileModalProps {
    visible?: boolean;
    onClose: () => void;
}

const EditProfileModal: FC<EditProfileModalProps> = ({visible, onClose}) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<ImageObj>();

    const handleClickImage = () => {
        console.log(uploadRef.current)
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
                setImage({src: URL.createObjectURL(fileObj), file});
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

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
                Edit Profile
            </DialogTitle>
            <DialogContent style={{height: "550px", width: "600px", padding: "0px 0px"}}>
                <div>
                    <div className="edit_header">
                        <div className="edit_header_image">
                            <IconButton onClick={handleClickImage} style={{color: "#fff"}}>
                                <PhotoCameraOutlinedIcon />
                            </IconButton>
                            <input ref={uploadRef} type="file" id="upload-wallpaper-input" hidden />
                            <img key={image?.src} src={image?.src}/>
                        </div>
                    </div>
                    <div className="user__info">
                        <Avatar/>
                    </div>
                    <TweeterInput label={"Name"} maxTextLength={50}/>
                    <TweeterInput label={"Bio"} maxTextLength={160}/>
                    <TweeterInput label={"Location"} maxTextLength={30}/>
                    <TweeterInput label={"Website"} maxTextLength={100}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileModal;
