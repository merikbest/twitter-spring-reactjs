import React, { memo, ReactElement } from "react";
import { Button } from "@material-ui/core";

import { useUserPageStyles } from "../UserPageStyles";
import { useUnfollowUserButton } from "./useUnfollowUserButton";

const UnfollowUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const { btnText, handleFollow, onMouseOver, onMouseLeave } = useUnfollowUserButton();

    return (
        <Button
            className={classes.primaryButton}
            onClick={handleFollow}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            color="primary"
            variant="contained"
            size="large"
        >
            {btnText}
        </Button>
    );
});

export default UnfollowUserButton;
