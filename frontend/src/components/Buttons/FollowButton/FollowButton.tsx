import React, { FC, ReactElement } from "react";
import Button from "@material-ui/core/Button/Button";
import { useDispatch } from "react-redux";

import { useFollowButtonStyles } from "./FollowButtonStyles";
import { followUser, processFollowRequest } from "../../../store/ducks/user/actionCreators";

interface FollowButtonProps {
    userId: number;
    isPrivateProfile: boolean;
    size?: "medium" | "large" | "small";
}

const FollowButton: FC<FollowButtonProps> = ({ userId, isPrivateProfile, size }): ReactElement => {
    const classes = useFollowButtonStyles();
    const dispatch = useDispatch();

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        if (isPrivateProfile) {
            dispatch(processFollowRequest(userId));
        } else {
            dispatch(followUser({ userId }));
        }
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={handleFollow}
            color="primary"
            variant="outlined"
            size={size}
        >
            Follow
        </Button>
    );
};

export default FollowButton;
