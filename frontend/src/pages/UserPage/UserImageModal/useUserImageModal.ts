import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const useUserImageModal = () => {
    const location = useLocation<{ imageSrc: string }>();
    const history = useHistory();
    const [visibleUserAvatarModalWindow, setVisibleUserAvatarModalWindow] = useState<boolean>(false);

    const onCloseUserAvatarModalWindow = (event: any): void => {
        if (event.target.classList[0]?.includes("container")) {
            onClose();
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

    useEffect(() => {
        setVisibleUserAvatarModalWindow(true);
        document.body.style.marginRight = "15px";
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.marginRight = "0px";
            document.body.style.overflow = "unset";
        };
    }, []);

    return { location, visibleUserAvatarModalWindow, onCloseUserAvatarModalWindow, onCloseModalWindow };
};
