import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button/Button";
import { useTranslation } from "react-i18next";

import { useUnfollowButtonStyles } from "./UnfollowButtonStyles";
import UnfollowModal from "../../UnfollowModal/UnfollowModal";
import { processFollowRequest, unfollowUser } from "../../../store/ducks/user/actionCreators";
import { useModalWindow } from "../../../hook/useModalWindow";

interface UnfollowButtonProps {
    userId: number;
    isPrivateProfile: boolean;
    fullName: string;
    size?: "medium" | "large" | "small";
    isOpenUnfollowModal?: boolean;
}

const UnfollowButton: FC<UnfollowButtonProps> = (
    {
        userId,
        isPrivateProfile,
        fullName,
        size,
        isOpenUnfollowModal
    }
): ReactElement => {
    const classes = useUnfollowButtonStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("FOLLOWING", { defaultValue: "Following" }));
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const handleClickOpenUnfollowModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        onOpenModalWindow();
    };

    const handleUnfollow = (): void => {
        if (isPrivateProfile) {
            dispatch(processFollowRequest(userId));
        } else {
            dispatch(unfollowUser({ userId }));
            onCloseModalWindow();
        }
    };

    return (
        <>
            <Button
                className={classes.containedButton}
                onClick={isOpenUnfollowModal ? handleClickOpenUnfollowModal : handleUnfollow}
                onMouseOver={() => setBtnText(t("UNFOLLOW", { defaultValue: "Unfollow" }))}
                onMouseLeave={() => setBtnText(t("FOLLOWING", { defaultValue: "Following" }))}
                color="primary"
                variant="contained"
                size={size}
            >
                {btnText}
            </Button>
            <UnfollowModal
                fullName={fullName}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
                handleUnfollow={handleUnfollow}
            />
        </>
    );
};

export default UnfollowButton;
