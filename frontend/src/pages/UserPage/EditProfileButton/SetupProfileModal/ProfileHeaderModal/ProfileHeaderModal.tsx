import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Avatar, Typography } from "@material-ui/core";

import { useProfileHeaderModalStyles } from "./ProfileHeaderModalStyles";
import UploadProfileImage from "../../../../../components/UploadProfileImage/UploadProfileImage";
import { DEFAULT_PROFILE_IMG } from "../../../../../constants/url-constants";
import { selectUserProfileFullName, selectUserProfileUsername } from "../../../../../store/ducks/user/selectors";
import { ImageObj } from "../../../../../components/AddTweetForm/AddTweetForm";
import ProfileModal from "../ProfileModal/ProfileModal";

interface ProfileHeaderModalProps {
    isOpen: boolean;
    onClose: () => void;
    avatar?: ImageObj;
    wallpaper?: ImageObj;
    onChangeWallpaper: (imageObj: ImageObj) => void;
    onOpenProfileDescriptionModal: () => void;
}

const ProfileHeaderModal: FC<ProfileHeaderModalProps> = (
    {
        isOpen,
        avatar,
        wallpaper,
        onChangeWallpaper,
        onClose,
        onOpenProfileDescriptionModal
    }
): ReactElement => {
    const classes = useProfileHeaderModalStyles();
    const myProfileFullName = useSelector(selectUserProfileFullName);
    const myProfileUsername = useSelector(selectUserProfileUsername);

    return (
        <ProfileModal
            isOpen={isOpen}
            onClose={onClose}
            title={"Pick a header"}
            subtitle={"People who visit your profile will see it. Show your style."}
            onClick={onOpenProfileDescriptionModal}
            isComponentSelected={wallpaper?.src !== undefined}
            hideBackdrop
        >
            <div className={classes.wallpaperWrapper}>
                <img
                    className={classes.wallpaperImg}
                    key={wallpaper?.src}
                    alt={"default-wallpaper"}
                    src={wallpaper ? wallpaper?.src : ""}
                />
                <div className={classes.wallpaperEditImg}>
                    <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={onChangeWallpaper} />
                </div>
            </div>
            <div className={classes.avatarWrapper}>
                <Avatar key={avatar?.src} src={avatar?.src ?? DEFAULT_PROFILE_IMG}>
                    <img alt="default-avatar" src={DEFAULT_PROFILE_IMG} />
                </Avatar>
            </div>
            <Typography variant={"h3"} component={"div"}>
                {myProfileFullName}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                @{myProfileUsername}
            </Typography>
        </ProfileModal>
    );
};

export default ProfileHeaderModal;
