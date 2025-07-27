import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const useUnfollowTopicButton = (onClickFollowTopic: () => void, onOpenModalWindow: () => void) => {
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState(t("FOLLOWING", { defaultValue: "Following" }));

    const handleMouseOver = (): void => {
        setBtnText(t("UNFOLLOW", { defaultValue: "Unfollow" }));
    };

    const handleMouseLeave = (): void => {
        setBtnText(t("FOLLOWING", { defaultValue: "Following" }));
    };

    const handleClickOpenUnfollowModal = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        onOpenModalWindow();
    };

    return {
        btnText,
        onClickFollowTopic,
        handleMouseOver,
        handleMouseLeave,
        handleClickOpenUnfollowModal
    };
};
