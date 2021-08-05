import React, {FC, ReactElement, useState} from 'react';

import {useSetupProfileModalStyles} from "./SetupProfileModalStyles";
import ProfilePictureModal from "./ProfilePictureModal/ProfilePictureModal";

interface SetupProfileModalProps {
    visible?: boolean;
    onClose: () => void;
}

const SetupProfileModal: FC<SetupProfileModalProps> = ({visible, onClose}): ReactElement => {
    const classes = useSetupProfileModalStyles();
    const [visibleProfilePictureModal, setVisibleProfilePictureModal] = useState<boolean>(false);
    const [visibleCreteAccountModal, setVisibleCreteAccountModal] = useState<boolean>(false);

    const handleCloseModal = (): void => {
        setVisibleProfilePictureModal(false);
    };

    return (
        <div>
            <ProfilePictureModal
                open={visible!}
                onClose={handleCloseModal}
                onOpenCreateAccount={setVisibleCreteAccountModal}/>

        </div>
    );
};

export default SetupProfileModal;
