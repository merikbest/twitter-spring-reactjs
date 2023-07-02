import React, { memo, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import { selectUserProfileCustomized } from "../../../store/ducks/user/selectors";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import SetupProfileModal from "./SetupProfileModal/SetupProfileModal";
import { selectUsersIsSuccessLoaded } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const EditProfileButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const location = useLocation<{ isRegistered: boolean; }>();
    const myProfileCustomized = useSelector(selectUserProfileCustomized);
    const isUserProfileSuccessLoaded = useSelector(selectUsersIsSuccessLoaded);
    const [visibleEditProfile, setVisibleEditProfile] = useState<boolean>(false);
    const [visibleSetupProfile, setVisibleSetupProfile] = useState<boolean>(false);

    useEffect(() => {
        if (location.state?.isRegistered) {
            setVisibleSetupProfile(true);
        }
    }, [isUserProfileSuccessLoaded]);

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

    return (
        <>
            <Button
                className={classes.outlinedButton}
                onClick={myProfileCustomized ? onOpenEditProfile : onOpenSetupProfile}
                color="primary"
                variant="outlined"
                size="large"
            >
                {myProfileCustomized ? "Edit profile" : "Setup profile"}
            </Button>
            <EditProfileModal visible={visibleEditProfile} onClose={onCloseEditProfile} />
            <SetupProfileModal visible={visibleSetupProfile} onClose={onCloseSetupProfile} />
        </>
    );
});

export default EditProfileButton;
