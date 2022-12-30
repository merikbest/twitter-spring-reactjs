import React, {FC, ReactElement} from 'react';
import {Avatar, Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useProfilePictureModalStyles} from "./ProfilePictureModalStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import UploadProfileImage from "../../../components/EditProfileModal/UploadProfileImage";
import {ImageObj} from "../../../components/AddTweetForm/AddTweetForm";

interface ProfilePictureModalProps {
    open: boolean;
    onClose: () => void;
    avatar?: ImageObj;
    onChangeAvatar: (imageObj: ImageObj) => void
    onOpenProfileHeaderModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProfilePictureModal: FC<ProfilePictureModalProps> = (
    {
        open,
        onClose,
        avatar,
        onChangeAvatar,
        onOpenProfileHeaderModal
    }
): ReactElement => {
    const classes = useProfilePictureModalStyles();

    return (
        <Dialog transitionDuration={0} open={open} onClose={onClose}>
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <Typography variant={"h3"} component={"div"} className={classes.title}>
                    Pick a profile picture
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    Have a favorite selfie? Upload it now.
                </Typography>
                <div className={classes.avatarWrapper}>
                    <UploadProfileImage
                        name={"avatar"}
                        image={avatar}
                        onChangeImage={onChangeAvatar}
                        setupProfile
                    />
                    <Avatar key={avatar?.src} src={avatar ? avatar.src : DEFAULT_PROFILE_IMG}/>
                </div>
                <Button
                    className={classes.button}
                    onClick={() => onOpenProfileHeaderModal(true)}
                    variant={avatar?.src ? "contained" : "text"}
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    {avatar?.src ? "Next" : "Skip for now"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfilePictureModal;
