import React, { FC, ReactElement } from "react";
import Button from "@material-ui/core/Button/Button";

import { useFollowTopicButtonStyles } from "./FollowTopicButtonStyles";

interface FollowTopicButtonProps {
    onClickButton: () => void;
}

const FollowTopicButton: FC<FollowTopicButtonProps> = ({ onClickButton }): ReactElement => {
    const classes = useFollowTopicButtonStyles();

    return (
        <Button
            className={classes.outlinedButton}
            onClick={onClickButton}
            color="primary"
            variant="outlined"
            size="small"
        >
            Follow
        </Button>
    );
};

export default FollowTopicButton;
