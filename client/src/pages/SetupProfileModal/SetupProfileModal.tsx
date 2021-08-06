import React, {FC, ReactElement, useState} from 'react';

import {useSetupProfileModalStyles} from "./SetupProfileModalStyles";
import ProfilePictureModal from "./ProfilePictureModal/ProfilePictureModal";
import ProfileHeaderModal from "./ProfileHeaderModal/ProfileHeaderModal";
import {ImageObj} from "../../components/AddTweetForm/AddTweetForm";
import ProfileDescriptionModal from "./ProfileDescriptionModal/ProfileDescriptionModal";
import ProfileUpdatedModal from "./ProfileUpdatedModal/ProfileUpdatedModal";

interface SetupProfileModalProps {
    visible?: boolean;
    onClose: () => void;
}

const SetupProfileModal: FC<SetupProfileModalProps> = ({visible, onClose}): ReactElement => {
    const classes = useSetupProfileModalStyles();
    const [visibleProfilePictureModal, setVisibleProfilePictureModal] = useState<boolean>(false);
    const [visibleProfileHeaderModal, setVisibleProfileHeaderModal] = useState<boolean>(false);
    const [visibleProfileDescriptionModal, setVisibleProfileDescriptionModal] = useState<boolean>(false);
    const [visibleProfileUpdatedModal, setVisibleProfileUpdatedModal] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [bio, setBio] = useState<string>("");

    const handleCloseModal = (): void => {
        setVisibleProfilePictureModal(false);
        setVisibleProfileHeaderModal(false);
        setVisibleProfileDescriptionModal(false);
        setVisibleProfileUpdatedModal(false);
    };

    return (
        <div>
            <ProfilePictureModal
                open={visible!}
                onClose={handleCloseModal}
                avatar={avatar}
                onChangeAvatar={setAvatar}
                onOpenProfileHeaderModal={setVisibleProfileHeaderModal}/>
            <ProfileHeaderModal
                open={visibleProfileHeaderModal}
                avatar={avatar}
                wallpaper={wallpaper}
                onChangeWallpaper={setWallpaper}
                onClose={handleCloseModal}
                onOpenProfileDescriptionModal={setVisibleProfileDescriptionModal}/>
            <ProfileDescriptionModal
                open={visibleProfileDescriptionModal}
                onClose={handleCloseModal}
                text={bio}
                onChangeText={setBio}
                onOpenProfileUpdatedModal={setVisibleProfileUpdatedModal}/>
            <ProfileUpdatedModal
                open={visibleProfileUpdatedModal}
                onClose={handleCloseModal}/>
        </div>
    );
};

export default SetupProfileModal;
