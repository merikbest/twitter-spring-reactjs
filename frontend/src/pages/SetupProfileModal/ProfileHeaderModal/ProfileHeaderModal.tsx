import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useProfileHeaderModalStyles } from "./ProfileHeaderModalStyles";
import UploadProfileImage from "../../../components/EditProfileModal/UploadProfileImage";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { selectUserProfileFullName, selectUserProfileUsername } from "../../../store/ducks/user/selectors";
import { ImageObj } from "../../../components/AddTweetForm/AddTweetForm";

interface ProfileHeaderModalProps {
    open: boolean;
    onClose: () => void;
    avatar?: ImageObj;
    wallpaper?: ImageObj;
    onChangeWallpaper: (imageObj: ImageObj) => void;
    onOpenProfileDescriptionModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProfileHeaderModal: FC<ProfileHeaderModalProps> = (
    {
        open,
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
        <Dialog transitionDuration={0} open={open} onClose={onClose} hideBackdrop>
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon />
                </div>
                <Typography variant={"h3"} component={"div"} className={classes.title}>
                    Pick a header
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    People who visit your profile will see it. Show your style.
                </Typography>
                <div className={classes.wallpaperWrapper}>
                    <img
                        className={classes.wallpaperImg}
                        key={wallpaper?.src}
                        alt={""}
                        src={wallpaper ? wallpaper?.src : ""}
                    />
                    <div className={classes.wallpaperEditImg}>
                        <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={onChangeWallpaper} />
                    </div>
                </div>
                <div className={classes.avatarWrapper}>
                    <Avatar key={avatar?.src} src={avatar?.src ?? DEFAULT_PROFILE_IMG}>
                        <img alt="default-img" src={DEFAULT_PROFILE_IMG} />
                    </Avatar>
                </div>
                <Typography variant={"h3"} component={"div"}>
                    {myProfileFullName}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    @{myProfileUsername}
                </Typography>
                <Button
                    className={classes.button}
                    onClick={() => onOpenProfileDescriptionModal(true)}
                    variant={wallpaper?.src ? "contained" : "text"}
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    {wallpaper?.src ? "Next" : "Skip for now"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileHeaderModal;
