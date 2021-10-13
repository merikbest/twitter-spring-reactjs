import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {Avatar, Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useProfileHeaderModalStyles} from "./ProfileHeaderModalStyles";
import UploadProfileImage from "../../../components/EditProfileModal/UploadProfileImage";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {ImageObj} from "../../../components/AddTweetForm/AddTweetForm";

interface ProfileHeaderModalProps {
    open: boolean;
    onClose: () => void;
    avatar?: ImageObj;
    wallpaper?: ImageObj;
    onChangeWallpaper: (imageObj: ImageObj) => void
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
    const myProfile = useSelector(selectUserData);

    return (
        <Dialog
            hideBackdrop={true}
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <Typography component={"div"} className={classes.title}>
                    Pick a header
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    People who visit your profile will see it. Show your style.
                </Typography>
                <div className={classes.wallpaperWrapper}>
                    <img
                        className={classes.wallpaperImg}
                        key={wallpaper?.src}
                        src={(wallpaper?.src === undefined) ? "" : wallpaper?.src}
                    />
                    <div className={classes.wallpaperEditImg}>
                        <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={onChangeWallpaper}/>
                    </div>
                </div>
                <div className={classes.avatarWrapper}>
                    <Avatar
                        key={avatar?.src}
                        src={(avatar?.src === undefined) ? DEFAULT_PROFILE_IMG : avatar?.src}
                    >
                        <img alt="default-img" src={DEFAULT_PROFILE_IMG}/>
                    </Avatar>
                </div>
                <Typography component={"div"} className={classes.fullName}>
                    {myProfile?.fullName}
                </Typography>
                <Typography component={"div"} className={classes.username}>
                    @{myProfile?.username}
                </Typography>
                <Button
                    className={classes.button}
                    onClick={() => onOpenProfileDescriptionModal(true)}
                    variant={(wallpaper?.src !== undefined) ? "contained" : "text"}
                    color="primary"
                    fullWidth
                >
                    {wallpaper?.src !== undefined ? "Next" : "Skip for now"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileHeaderModal;
