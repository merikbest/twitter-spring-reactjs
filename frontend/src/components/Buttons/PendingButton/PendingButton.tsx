import React, { FC, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button/Button";

import { usePendingButtonStyles } from "./PendingButtonStyles";
import { processFollowRequest } from "../../../store/ducks/user/actionCreators";

interface PendingButtonProps {
    userId: number;
    size?: "medium" | "large" | "small";
}

const PendingButton: FC<PendingButtonProps> = ({ userId, size }): ReactElement => {
    const classes = usePendingButtonStyles();
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState<string>("Pending");

    const cancelFollow = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processFollowRequest(userId));
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={cancelFollow}
            onMouseOver={() => setBtnText("Cancel")}
            onMouseLeave={() => setBtnText("Pending")}
            color="primary"
            variant="outlined"
            size={size}
        >
            {btnText}
        </Button>
    );
};

export default PendingButton;
