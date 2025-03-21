import React, { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Avatar, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

import TweetInput from "../../../../components/TweetInput/TweetInput";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { selectUserData } from "../../../../store/ducks/user/selectors";
import { uploadImage } from "../../../../util/upload-image-helper";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";
import { useEditProfileModalStyles } from "./EditProfileModalStyles";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { updatedUserData } from "../../../../store/ducks/user/actionCreators";
import { useGlobalStyles } from "../../../../util/globalClasses";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";

interface EditProfileModalProps {
    visible?: boolean;
    onClose: () => void;
}

export interface EditProfileFormProps {
    fullName: string;
    about: string;
    location: string;
    website: string;
}

const editProfileModalFormSchema = (t: TFunction<"translation", undefined>) => yup.object().shape({
    listName: yup.string().min(1, t("NAME_ERROR", { defaultValue: "Name can’t be blank" })).required()
});

const EditProfileModal: FC<EditProfileModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useEditProfileModalStyles();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const { t } = useTranslation();
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();

    const { control, handleSubmit, formState: { errors } } = useForm<EditProfileFormProps>({
        defaultValues: {
            fullName: userData?.fullName,
            about: userData?.about,
            location: userData?.location,
            website: userData?.website
        },
        resolver: yupResolver(editProfileModalFormSchema(t))
    });

    const onSubmit = async (data: EditProfileFormProps): Promise<void> => {
        let avatarResponse: string | undefined = undefined;
        let wallpaperResponse: string | undefined = undefined;
        if (avatar) {
            avatarResponse = await uploadImage(avatar.file);
        }
        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }
        dispatch(updatedUserData({ ...data, avatar: avatarResponse!, wallpaper: wallpaperResponse! }));
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitleComponent
                    title={t("EDIT_PROFILE", { defaultValue: "Edit Profile" })}
                    onClose={onClose}
                >
                    <Button type="submit" variant="contained" color="primary">
                        {t("SAVE", { defaultValue: "Save" })}
                    </Button>
                </DialogTitleComponent>
                <DialogContent className={globalClasses.dialogContent}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img
                                className={classes.wallpaperImg}
                                key={wallpaper?.src}
                                alt="wallpaper"
                                src={(userData?.wallpaper && !wallpaper?.src) ? userData?.wallpaper : wallpaper?.src}
                            />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name="wallpaper" image={wallpaper} onChangeImage={setWallpaper} />
                            </div>
                        </div>
                        <div className={classes.avatarWrapper}>
                            <UploadProfileImage name="avatar" image={avatar} onChangeImage={setAvatar} />
                            <Avatar
                                key={avatar?.src}
                                src={(userData?.avatar && !avatar?.src) ? userData?.avatar : avatar?.src}
                            >
                                <img alt="default-img" src={DEFAULT_PROFILE_IMG} />
                            </Avatar>
                        </div>
                        <FormControl className={classes.inputWrapper} variant="outlined">
                            <FormGroup aria-label="position">
                                <Controller
                                    name="fullName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => (
                                        <TweetInput
                                            name="fullName"
                                            helperText={errors.fullName?.message}
                                            error={!!errors.fullName}
                                            label={t("NAME", { defaultValue: "Name" })}
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
                                    render={({ field: { onChange, value } }) => (
                                        <TweetInput
                                            name="about"
                                            label={t("BIO", { defaultValue: "Bio" })}
                                            maxTextLength={160}
                                            onChange={onChange}
                                            value={value}
                                            rows={3}
                                            multiline
                                        />
                                    )}
                                />
                                <Controller
                                    name="location"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => (
                                        <TweetInput
                                            name="location"
                                            label={t("LOCATION", { defaultValue: "Location" })}
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
                                    render={({ field: { onChange, value } }) => (
                                        <TweetInput
                                            name="website"
                                            label={t("WEBSITE", { defaultValue: "Website" })}
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
