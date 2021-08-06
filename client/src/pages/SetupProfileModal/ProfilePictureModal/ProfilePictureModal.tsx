import React, {FC, ReactElement, useState} from 'react';
import {Avatar, Button, Dialog, DialogContent} from "@material-ui/core";
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

const ProfilePictureModal: FC<ProfilePictureModalProps> = ({
                                                               open,
                                                               onClose,
                                                               avatar,
                                                               onChangeAvatar,
                                                               onOpenProfileHeaderModal
                                                           }): ReactElement => {
    const classes = useProfilePictureModalStyles();

    return (
        <Dialog
            style={{height: 666, marginTop: 92}}
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{padding: "0 32px"}} className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <div className={classes.title}>
                    Pick a profile picture
                </div>
                <div className={classes.text}>
                    Have a favorite selfie? Upload it now.
                </div>
                <div className={classes.avatarWrapper}>
                    <UploadProfileImage
                        setupProfile={true}
                        name={"avatar"}
                        image={avatar}
                        onChangeImage={onChangeAvatar}/>
                    <Avatar
                        key={avatar?.src}
                        src={(avatar?.src === undefined) ? DEFAULT_PROFILE_IMG : avatar?.src}/>
                </div>
                <Button
                    className={classes.button}
                    onClick={() => onOpenProfileHeaderModal(true)}
                    variant={(avatar?.src !== undefined) ? "contained" : "text"}
                    color="primary"
                    fullWidth
                >
                    {(avatar?.src !== undefined) ? "Next" : "Skip for now"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfilePictureModal;
