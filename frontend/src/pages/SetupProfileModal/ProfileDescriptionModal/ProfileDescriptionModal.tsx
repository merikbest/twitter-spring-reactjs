import React, { FC, ReactElement } from "react";

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
    return (
        <ProfileModal
            isOpen={isOpen}
            onClose={onClose}
            title={"Describe yourself"}
            subtitle={"What makes you special? Don't think too hard, just have fun with it."}
            onClick={onOpenProfileUpdatedModal}
            isComponentSelected={text !== ""}
            hideBackdrop
        >
            <ProfileDescriptionInput
                value={text}
                onChange={(event) => onChangeText(event.target.value)}
                name={"about"}
                label={"Your bio"}
                maxTextLength={160}
            />
        </ProfileModal>
    );
};

export default ProfileDescriptionModal;
