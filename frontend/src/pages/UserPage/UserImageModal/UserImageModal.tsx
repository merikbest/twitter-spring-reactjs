import React, { FC, ReactElement } from "react";
import { IconButton } from "@material-ui/core";

import { useUserImageModalStyles } from "./UserImageModalStyles";
import { CloseIcon } from "../../../icons";
import { useUserImageModal } from "./useUserImageModal";

const UserImageModal: FC = (): ReactElement | null => {
    const {
        location,
        visibleUserAvatarModalWindow,
        onCloseUserAvatarModalWindow,
        onCloseModalWindow
    } = useUserImageModal();
    const classes = useUserImageModalStyles({ pathname: location.pathname });

    if (!visibleUserAvatarModalWindow) {
        return null;
    }

    return (
        <div className={classes.container} onClick={onCloseUserAvatarModalWindow}>
            <div className={classes.imageModalClose}>
                <img className={classes.imageModal} alt={location.state.imageSrc} src={location.state.imageSrc} />
                <IconButton onClick={onCloseModalWindow} size="small">
                    {CloseIcon}
                </IconButton>
            </div>
        </div>
    );
};

export default UserImageModal;