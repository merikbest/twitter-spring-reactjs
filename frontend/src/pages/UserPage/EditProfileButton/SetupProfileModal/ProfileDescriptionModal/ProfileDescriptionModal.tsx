import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import ProfileDescriptionInput from "./ProfileDescriptionInput/ProfileDescriptionInput";
import ProfileModal from "../ProfileModal/ProfileModal";

interface ProfileDescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onChangeText: (value: string | ((prevVar: string) => string)) => void;
    onOpenProfileUpdatedModal: () => void;
}

const ProfileDescriptionModal: FC<ProfileDescriptionModalProps> = (
    {
        isOpen,
        onClose,
        text,
        onChangeText,
        onOpenProfileUpdatedModal
    }
): ReactElement => {
    const { t } = useTranslation();

    return (
        <ProfileModal
            isOpen={isOpen}
            onClose={onClose}
            title={t("DESCRIBE_YOURSELF", { defaultValue: "Describe yourself" })}
            subtitle={t("DESCRIBE_YOURSELF_DESCRIPTION", {
                defaultValue: "What makes you special? Don't think too hard, just have fun with it." })}
            onClick={onOpenProfileUpdatedModal}
            isComponentSelected={text !== ""}
            hideBackdrop
        >
            <ProfileDescriptionInput
                value={text}
                onChange={(event) => onChangeText(event.target.value)}
                label={t("YOUR_BIO", { defaultValue: "Your bio" })}
                maxTextLength={160}
            />
        </ProfileModal>
    );
};

export default ProfileDescriptionModal;
