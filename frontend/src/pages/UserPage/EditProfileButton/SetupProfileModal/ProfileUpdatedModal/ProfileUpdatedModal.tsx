import React, { FC, ReactElement } from "react";
import { Button } from "@material-ui/core";

import { useProfileUpdatedModalStyles } from "./ProfileUpdatedModalStyles";
import ProfileModal from "../ProfileModal/ProfileModal";

interface ProfileUpdatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void>;
}

const ProfileUpdatedModal: FC<ProfileUpdatedModalProps> = ({ isOpen, onClose, onSubmit }): ReactElement => {
    const classes = useProfileUpdatedModalStyles();

    return (
        <ProfileModal
            isOpen={isOpen}
            onClose={onClose}
            title={"Your profile is updated"}
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
                    See profile
                </Button>
            </div>
        </ProfileModal>
    );
};

export default ProfileUpdatedModal;
