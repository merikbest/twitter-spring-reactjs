import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Avatar, Button} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import TweeterInput from "./TweetInput/TweeterInput";
import {ImageObj} from "../AddTweetForm/AddTweetForm";
import {selectUserData} from "../../store/ducks/user/selectors";
import {Image} from "../../store/ducks/tweets/contracts/state";
import {uploadImage} from "../../util/uploadImage";
import UploadProfileImage from "./UploadProfileImage";
import {useEditProfileModalStyles} from "./EditProfileModalStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {updatedUserData} from "../../store/ducks/userProfile/actionCreators";
import CloseButton from "../CloseButton/CloseButton";

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

const EditProfileModal: FC<EditProfileModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useEditProfileModalStyles();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();

    const {control, register, handleSubmit, formState: {errors}} = useForm<EditProfileFormProps>({
        defaultValues: {
            username: userData?.username,
            about: userData?.about,
            location: userData?.location,
            website: userData?.website,
        },
        resolver: yupResolver(EditProfileFormSchema)
    });

    const onSubmit = async (data: EditProfileFormProps): Promise<void> => {
        let avatarResponse: Image | undefined = undefined;
        let wallpaperResponse: Image | undefined = undefined;
        if (avatar) {
            avatarResponse = await uploadImage(avatar.file);
        }
        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }
        dispatch(updatedUserData({...data, avatar: avatarResponse, wallpaper: wallpaperResponse}));
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">
                    <CloseButton onClose={onClose}/>
                    Edit Profile
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img
                                className={classes.wallpaperImg}
                                key={wallpaper?.src}
                                src={(userData?.wallpaper?.src && wallpaper?.src === undefined) ?
                                    userData?.wallpaper?.src : wallpaper?.src}
                            />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper}/>
                            </div>
                        </div>
                        <div className={classes.avatarWrapper}>
                            <UploadProfileImage name={"avatar"} image={avatar} onChangeImage={setAvatar}/>
                            <Avatar
                                key={avatar?.src}
                                src={userData?.avatar?.src && avatar?.src === undefined ? userData?.avatar?.src : avatar?.src}
                            >
                                <img alt="default-img" src={DEFAULT_PROFILE_IMG}/>
                            </Avatar>
                        </div>
                        <FormControl className={classes.inputWrapper} variant="outlined">
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
