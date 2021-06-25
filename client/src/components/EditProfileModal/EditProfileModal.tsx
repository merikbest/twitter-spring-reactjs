import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Avatar, Button} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import TweeterInput from "./TweetInput/TweeterInput";
import {ImageObj} from "../AddTweetForm/AddTweetForm";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectUserData} from "../../store/ducks/user/selectors";
import {Image} from "../../store/ducks/tweets/contracts/state";
import {uploadImage} from "../../util/uploadImage";
import {setUpdatedUserData} from "../../store/ducks/user/actionCreators";
import UploadProfileImage from "./UploadProfileImage";
import "./EditProfileModalStyles.scss";

interface EditProfileModalProps {
    visible?: boolean;
    onClose: () => void;
}

export interface EditProfileFormProps {
    username: string;
    about: string;
    location: string;
    website: string;
}

export const EditProfileFormSchema = yup.object().shape({
    username: yup.string().min(1, "Name can’t be blank").required(),
});

const EditProfileModal: FC<EditProfileModalProps> = ({visible, onClose}) => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const classes = useHomeStyles();
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();

    const {control, register, handleSubmit, formState: {errors}} = useForm<EditProfileFormProps>({
        defaultValues: {
            username: userData?.user.username,
            about: userData?.user.about,
            location: userData?.user.location,
            website: userData?.user.website,
        },
        resolver: yupResolver(EditProfileFormSchema)
    });

    console.log(avatar)

    const onSubmit = async (data: EditProfileFormProps) => {
        let avatarResponse: Image | undefined = undefined;
        let wallpaperResponse: Image | undefined = undefined;
        if (avatar) {
            avatarResponse = await uploadImage(avatar.file);
        }
        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }
        dispatch(setUpdatedUserData({...data, avatar: avatarResponse, wallpaper: wallpaperResponse}));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">
                    <IconButton onClick={onClose} color="secondary" aria-label="close">
                        <CloseIcon style={{fontSize: 26}} color="secondary"/>
                    </IconButton>
                    Edit Profile
                    <Button
                        type="submit"
                        className={classes.saveEditedProfileBtn}
                        variant="contained"
                        color="primary">
                        Save
                    </Button>
                </DialogTitle>
                <DialogContent style={{height: "550px", width: "600px", padding: "0px 0px"}}>
                    <div>
                        <div className="edit_header">
                            <img className="wallpaper_img"
                                 key={wallpaper?.src}
                                 src={userData?.user.wallpaper?.src && wallpaper?.src === undefined ?
                                     userData?.user.wallpaper?.src : wallpaper?.src}/>
                            <div className="edit_header_image">
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper}/>
                            </div>
                        </div>
                        <div className="edit_avatar">
                            <UploadProfileImage name={"avatar"} image={avatar} onChangeImage={setAvatar}/>
                            <Avatar key={avatar?.src}
                                    src={userData?.user.avatar?.src && avatar?.src === undefined ?
                                        userData?.user.avatar?.src : avatar?.src}>
                                <img alt="default-img"
                                     src="https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png"/>
                            </Avatar>
                        </div>
                        <FormControl className={"input_form"} variant="outlined">
                            <FormGroup aria-label="position">
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
                                        <TweeterInput
                                            name="username"
                                            helperText={errors.username?.message}
                                            error={!!errors.username}
                                            label={"Name"}
                                            maxTextLength={50}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                                <Controller
                                    name="about"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
                                        <TweeterInput
                                            name="about"
                                            label={"Bio"}
                                            maxTextLength={160}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                                <Controller
                                    name="location"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
                                        <TweeterInput
                                            name="location"
                                            label={"Location"}
                                            maxTextLength={30}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                                <Controller
                                    name="website"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
                                        <TweeterInput
                                            name="website"
                                            label={"Website"}
                                            maxTextLength={100}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </FormGroup>
                        </FormControl>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditProfileModal;
