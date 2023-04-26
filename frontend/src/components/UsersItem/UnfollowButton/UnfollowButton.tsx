import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button/Button";

import { useUnfollowButtonStyles } from "./UnfollowButtonStyles";
import { UserResponse } from "../../../types/user";
import { processFollowRequest, unfollowUser } from "../../../store/ducks/user/actionCreators";
import UnfollowModal from "../../UnfollowModal/UnfollowModal";
import { useModalWindow } from "../../../hook/useModalWindow";

interface UnfollowButtonProps {
    user?: UserResponse;
}

const UnfollowButton: FC<UnfollowButtonProps> = ({ user }): ReactElement => {
    const classes = useUnfollowButtonStyles();
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState<string>("Following");
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const handleClickOpenUnfollowModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        onOpenModalWindow();
    };

    const handleUnfollow = (): void => {
        if (user?.isPrivateProfile && !user.isFollower) {
            dispatch(processFollowRequest(user!.id));
        } else {
            dispatch(unfollowUser({ userId: user!.id }));
            onCloseModalWindow();
        }
    };

    return (
        <>
            <Button
                className={classes.containedButton}
                onClick={handleClickOpenUnfollowModal}
                onMouseOver={() => setBtnText("Unfollow")}
                onMouseLeave={() => setBtnText("Following")}
                color="primary"
                variant="contained"
                size="small"
            >
                {btnText}
            </Button>
            <UnfollowModal
                fullName={user?.fullName!}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
                handleUnfollow={handleUnfollow}
            />
        </>
    );
};

export default UnfollowButton;
