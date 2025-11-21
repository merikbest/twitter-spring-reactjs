import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uploadImage } from "../../../../util/upload-image-helper";
import {
    selectUserProfileFullName,
    selectUserProfileLocation,
    selectUserProfileWebsite
} from "../../../../store/ducks/user/selectors";
import { updatedUserData } from "../../../../store/ducks/user/actionCreators";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";

export const useSetupProfileModal = (onClose: () => void) => {
    const dispatch = useDispatch();
    const fullName = useSelector(selectUserProfileFullName);
    const location = useSelector(selectUserProfileLocation);
    const website = useSelector(selectUserProfileWebsite);
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

    const onOpenProfileHeaderModal = (): void => {
        setVisibleProfileHeaderModal(true);
    };

    const onOpenProfileDescriptionModal = (): void => {
        setVisibleProfileDescriptionModal(true);
    };

    const onOpenProfileUpdatedModal = (): void => {
        setVisibleProfileUpdatedModal(true);
    };

    const onSubmit = async (): Promise<void> => {
        let avatarResponse: string | undefined = undefined;
        let wallpaperResponse: string | undefined = undefined;

        if (avatar) {
            avatarResponse = await uploadImage(avatar.file);
        }
        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(updatedUserData({
            fullName: fullName!,
            location: location!,
            website: website!,
            avatar: avatarResponse!,
            wallpaper: wallpaperResponse!,
            about: bio
        }));
        handleCloseModal();
    };

    return {
        avatar,
        wallpaper,
        bio,
        visibleProfileHeaderModal,
        visibleProfileDescriptionModal,
        visibleProfileUpdatedModal,
        setAvatar,
        setWallpaper,
        setBio,
        onOpenProfileHeaderModal,
        onOpenProfileDescriptionModal,
        onOpenProfileUpdatedModal,
        handleCloseModal,
        onSubmit,
    };
};
