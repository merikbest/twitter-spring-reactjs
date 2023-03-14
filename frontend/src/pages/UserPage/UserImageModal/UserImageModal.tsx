import React, { FC, ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IconButton } from "@material-ui/core";

import { useUserImageModalStyles } from "./UserImageModalStyles";
import { CloseIcon } from "../../../icons";

const UserImageModal: FC = (): ReactElement | null => {
    const location = useLocation<{ imageSrc: string }>();
    const history = useHistory();
    const [visibleUserAvatarModalWindow, setVisibleUserAvatarModalWindow] = useState<boolean>(false);
    const classes = useUserImageModalStyles({ pathname: location.pathname });

    useEffect(() => {
        setVisibleUserAvatarModalWindow(true);
        document.body.style.marginRight = "15px";
        document.body.style.overflow = "hidden";
    }, []);

    const onCloseUserAvatarModalWindow = (event: any): void => {
        if (event.target.classList[0]) {
            if (event.target.classList[0].includes("container")) {
                onClose();
            }
        }
    };

    const onCloseModalWindow = (): void => {
        onClose();
    };

    const onClose = (): void => {
        setVisibleUserAvatarModalWindow(false);
        document.body.style.marginRight = "0px";
        document.body.style.overflow = "unset";
        history.goBack();
    };

    if (!visibleUserAvatarModalWindow) {
        return null;
    }

    return (
        <div className={classes.container} onClick={onCloseUserAvatarModalWindow}>
            <div className={classes.imageModalClose}>
                <img
                    className={classes.imageModal}
                    alt={location.state.imageSrc}
                    src={location.state.imageSrc}
                />
                <IconButton onClick={onCloseModalWindow} size="small">
                    {CloseIcon}
                </IconButton>
            </div>
        </div>
    );
};

export default UserImageModal;