import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserProfileCustomized } from "../../../store/ducks/user/selectors";
import { selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";

export const useEditProfileButton = () => {
    const location = useLocation<{ isRegistered: boolean }>();
    const myProfileCustomized = useSelector(selectUserProfileCustomized);
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);
    const [visibleSetupProfile, setVisibleSetupProfile] = useState<boolean>(false);

    const onOpenEditProfile = (): void => {
        setVisibleEditProfile(true);
    };

    const onCloseEditProfile = (): void => {
        setVisibleEditProfile(false);
    };

    const onOpenSetupProfile = (): void => {
        setVisibleSetupProfile(true);
    };

    const onCloseSetupProfile = (): void => {
        setVisibleSetupProfile(false);
        if (location.state) {
            location.state.isRegistered = false;
        }
    };

    useEffect(() => {
        if (location.state?.isRegistered) {
            setVisibleSetupProfile(true);
        }
    }, [isUserProfileSuccessLoaded]);

    return {
        myProfileCustomized,
        visibleEditProfile,
        visibleSetupProfile,
        onOpenEditProfile,
        onCloseEditProfile,
        onOpenSetupProfile,
        onCloseSetupProfile
    };
};
