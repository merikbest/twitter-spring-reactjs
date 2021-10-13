import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import ProfilePictureModal from "./ProfilePictureModal/ProfilePictureModal";
import ProfileHeaderModal from "./ProfileHeaderModal/ProfileHeaderModal";
import {ImageObj} from "../../components/AddTweetForm/AddTweetForm";
import ProfileDescriptionModal from "./ProfileDescriptionModal/ProfileDescriptionModal";
import ProfileUpdatedModal from "./ProfileUpdatedModal/ProfileUpdatedModal";
import {Image} from "../../store/ducks/tweets/contracts/state";
import {uploadImage} from "../../util/uploadImage";
import {selectUserData} from "../../store/ducks/user/selectors";
import {updatedUserData} from "../../store/ducks/userProfile/actionCreators";
import {useSetupProfileModalStyles} from "./SetupProfileModalStyles";

interface SetupProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

const SetupProfileModal: FC<SetupProfileModalProps> = ({visible, onClose}): ReactElement => {
    const classes = useSetupProfileModalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [visibleProfileHeaderModal, setVisibleProfileHeaderModal] = useState<boolean>(false);
    const [visibleProfileDescriptionModal, setVisibleProfileDescriptionModal] = useState<boolean>(false);
    const [visibleProfileUpdatedModal, setVisibleProfileUpdatedModal] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [bio, setBio] = useState<string>("");

    const handleCloseModal = (): void => {
        setVisibleProfileHeaderModal(false);
        setVisibleProfileDescriptionModal(false);
        setVisibleProfileUpdatedModal(false);
        onClose();
    };

    const onSubmit = async () => {
        let avatarResponse: Image | undefined = undefined;
        let wallpaperResponse: Image | undefined = undefined;

        if (avatar) {
            avatarResponse = await uploadImage(avatar.file);
        }
        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(updatedUserData({
            username: myProfile?.username!,
            location: myProfile?.location!,
            website: myProfile?.website!,
            avatar: avatarResponse,
            wallpaper: wallpaperResponse,
            about: bio
        }));
        handleCloseModal();
    };

    return (
        <div className={classes.container}>
            <ProfilePictureModal
                open={visible}
                onClose={handleCloseModal}
                avatar={avatar}
                onChangeAvatar={setAvatar}
                onOpenProfileHeaderModal={setVisibleProfileHeaderModal}
            />
            <ProfileHeaderModal
                open={visibleProfileHeaderModal}
                avatar={avatar}
                wallpaper={wallpaper}
                onChangeWallpaper={setWallpaper}
                onClose={handleCloseModal}
                onOpenProfileDescriptionModal={setVisibleProfileDescriptionModal}
            />
            <ProfileDescriptionModal
                open={visibleProfileDescriptionModal}
                onClose={handleCloseModal}
                text={bio}
                onChangeText={setBio}
                onOpenProfileUpdatedModal={setVisibleProfileUpdatedModal}
            />
            <ProfileUpdatedModal
                open={visibleProfileUpdatedModal}
                onClose={handleCloseModal}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default SetupProfileModal;
