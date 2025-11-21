import React, { memo, ReactElement } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import SetupProfileModal from "./SetupProfileModal";
import { useUserPageStyles } from "../UserPageStyles";
import { useEditProfileButton } from "./useEditProfileButton";
import EditProfileModal from "./EditProfileModal";

const EditProfileButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const { t } = useTranslation();
    const {
        myProfileCustomized,
        visibleEditProfile,
        visibleSetupProfile,
        onOpenEditProfile,
        onCloseEditProfile,
        onOpenSetupProfile,
        onCloseSetupProfile
    } = useEditProfileButton();

    return (
        <>
            <Button
                className={classes.outlinedButton}
                onClick={myProfileCustomized ? onOpenEditProfile : onOpenSetupProfile}
                color="primary"
                variant="outlined"
                size="large"
            >
                {myProfileCustomized
                    ? t("EDIT_PROFILE", { defaultValue: "Edit profile" })
                    : t("SETUP_PROFILE", { defaultValue: "Setup profile" })}
            </Button>
            <EditProfileModal visible={visibleEditProfile} onClose={onCloseEditProfile} />
            <SetupProfileModal visible={visibleSetupProfile} onClose={onCloseSetupProfile} />
        </>
    );
});

export default EditProfileButton;
