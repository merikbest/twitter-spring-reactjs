import React, { FC, ReactElement } from "react";
import { Controller } from "react-hook-form";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Avatar, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { useTranslation } from "react-i18next";

import TweetInput from "../../../../components/TweetInput";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";
import { useEditProfileModalStyles } from "./EditProfileModalStyles";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { useGlobalStyles } from "../../../../util/globalClasses";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import useEditProfileModal from "./useEditProfileModal";
import EditBirthDate from "./EditBirthDate";

interface EditProfileModalProps {
    visible?: boolean;
    onClose: () => void;
}

const EditProfileModal: FC<EditProfileModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useEditProfileModalStyles();
    const { t } = useTranslation();
    const {
        userData,
        avatarImage,
        wallpaperImage,
        control,
        watch,
        errors,
        setAvatarImage,
        setWallpaperImage,
        handleSubmit,
        onSubmit
    } = useEditProfileModal(onClose);

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
                                key={wallpaperImage?.src}
                                alt="wallpaper"
                                src={(userData?.wallpaper && !wallpaperImage?.src) ? userData?.wallpaper : wallpaperImage?.src}
                            />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name="wallpaper" image={wallpaperImage} onChangeImage={setWallpaperImage} />
                            </div>
                        </div>
                        <div className={classes.avatarWrapper}>
                            <UploadProfileImage name="avatar" image={avatarImage} onChangeImage={setAvatarImage} />
                            <Avatar
                                key={avatarImage?.src}
                                src={(userData?.avatar && !avatarImage?.src) ? userData?.avatar : avatarImage?.src}
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
                                <EditBirthDate control={control} watch={watch} errors={errors} />
                            </FormGroup>
                        </FormControl>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditProfileModal;
