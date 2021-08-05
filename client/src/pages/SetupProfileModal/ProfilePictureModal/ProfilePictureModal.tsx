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
    onOpenCreateAccount: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProfilePictureModal: FC<ProfilePictureModalProps> = ({open, onClose, onOpenCreateAccount}): ReactElement => {
    const classes = useProfilePictureModalStyles();
    const [avatar, setAvatar] = useState<ImageObj>();

    return (
        <Dialog
            // hideBackdrop={true}
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
                    <UploadProfileImage setupProfile={true} name={"avatar"} image={avatar} onChangeImage={setAvatar}/>
                    <Avatar>
                        <img alt="default-img" src={DEFAULT_PROFILE_IMG}/>
                    </Avatar>
                </div>

                {/*<Button*/}
                {/*    style={{marginTop: 285}}*/}
                {/*    onClick={() => onOpenCreateAccount(true)}*/}
                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    fullWidth*/}
                {/*>*/}
                {/*    Next*/}
                {/*</Button>*/}
            </DialogContent>
        </Dialog>
    );
};

export default ProfilePictureModal;
