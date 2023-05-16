import React, { FC, ReactElement } from "react";
import { Avatar } from "@material-ui/core";

import { useProfilePictureModalStyles } from "./ProfilePictureModalStyles";
import { DEFAULT_PROFILE_IMG } from "../../../../../constants/url-constants";
import UploadProfileImage from "../../../../../components/UploadProfileImage/UploadProfileImage";
import { ImageObj } from "../../../../../components/AddTweetForm/AddTweetForm";
import ProfileModal from "../ProfileModal/ProfileModal";

interface ProfilePictureModalProps {
    isOpen: boolean;
    onClose: () => void;
    avatar?: ImageObj;
    onChangeAvatar: (imageObj: ImageObj) => void;
    onOpenProfileHeaderModal: () => void;
}

const ProfilePictureModal: FC<ProfilePictureModalProps> = (
    {
        isOpen,
        onClose,
        avatar,
        onChangeAvatar,
        onOpenProfileHeaderModal
    }
): ReactElement => {
    const classes = useProfilePictureModalStyles();

    return (
        <ProfileModal
            isOpen={isOpen}
            onClose={onClose}
            title={"Pick a profile picture"}
            subtitle={"Have a favorite selfie? Upload it now."}
            onClick={onOpenProfileHeaderModal}
            isComponentSelected={avatar?.src !== undefined}
        >
            <div className={classes.avatarWrapper}>
                <UploadProfileImage
                    name={"avatar"}
                    image={avatar}
                    onChangeImage={onChangeAvatar}
                    setupProfile
                />
                <Avatar key={avatar?.src} src={avatar ? avatar.src : DEFAULT_PROFILE_IMG} />
            </div>
        </ProfileModal>
    );
};

export default ProfilePictureModal;
