import React, { FC, ReactElement } from "react";

import ProfilePictureModal from "./ProfilePictureModal";
import ProfileHeaderModal from "./ProfileHeaderModal";
import ProfileDescriptionModal from "./ProfileDescriptionModal";
import ProfileUpdatedModal from "./ProfileUpdatedModal";
import { useSetupProfileModalStyles } from "./SetupProfileModalStyles";
import { useSetupProfileModal } from "./useSetupProfileModal";

interface SetupProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

const SetupProfileModal: FC<SetupProfileModalProps> = ({ visible, onClose }): ReactElement => {
    const classes = useSetupProfileModalStyles();
    const {
        avatarImage,
        wallpaperImage,
        bio,
        visibleProfileHeaderModal,
        visibleProfileDescriptionModal,
        visibleProfileUpdatedModal,
        setAvatarImage,
        setWallpaperImage,
        setBio,
        onOpenProfileHeaderModal,
        onOpenProfileDescriptionModal,
        onOpenProfileUpdatedModal,
        handleCloseModal,
        onSubmit,
    } = useSetupProfileModal(onClose);

    return (
        <div className={classes.container}>
            <ProfilePictureModal
                isOpen={visible}
                onClose={handleCloseModal}
                avatar={avatarImage}
                onChangeAvatar={setAvatarImage}
                onOpenProfileHeaderModal={onOpenProfileHeaderModal}
            />
            <ProfileHeaderModal
                isOpen={visibleProfileHeaderModal}
                avatar={avatarImage}
                wallpaper={wallpaperImage}
                onChangeWallpaper={setWallpaperImage}
                onClose={handleCloseModal}
                onOpenProfileDescriptionModal={onOpenProfileDescriptionModal}
            />
            <ProfileDescriptionModal
                isOpen={visibleProfileDescriptionModal}
                onClose={handleCloseModal}
                text={bio}
                onChangeText={setBio}
                onOpenProfileUpdatedModal={onOpenProfileUpdatedModal}
            />
            <ProfileUpdatedModal
                isOpen={visibleProfileUpdatedModal}
                onClose={handleCloseModal}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default SetupProfileModal;
