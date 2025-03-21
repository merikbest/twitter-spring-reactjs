import React, { FC, ReactElement } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useProfileUpdatedModalStyles } from "./ProfileUpdatedModalStyles";
import ProfileModal from "../ProfileModal/ProfileModal";

interface ProfileUpdatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void>;
}

const ProfileUpdatedModal: FC<ProfileUpdatedModalProps> = ({ isOpen, onClose, onSubmit }): ReactElement => {
    const classes = useProfileUpdatedModalStyles();
    const { t } = useTranslation();

    return (
        <ProfileModal
            isOpen={isOpen}
            onClose={onClose}
            title={t("YOUR_PROFILE_IS_UPDATED", { defaultValue: "Your profile is updated" })}
            isComponentSelected
            isProfileUpdated
            hideBackdrop
        >
            <div className={classes.buttonWrapper}>
                <Button
                    className={classes.button}
                    onClick={onSubmit}
                    variant="contained"
                    color="primary"
                    size="medium"
                >
                    {t("SEE_PROFILE", { defaultValue: "See profile" })}
                </Button>
            </div>
        </ProfileModal>
    );
};

export default ProfileUpdatedModal;
