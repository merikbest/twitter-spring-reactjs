import React, { memo, ReactElement } from "react";
import { Button } from "@material-ui/core";

import { usePopperListWindowStyles } from "../PopperListWindowStyles";
import { useUnfollowListButton } from "./useUnfollowListButton";

const UnfollowListButton = memo((): ReactElement => {
    const classes = usePopperListWindowStyles();
    const { btnText, handleUnfollow, handleMouseOver, handleMouseLeave } = useUnfollowListButton();

    return (
        <Button
            className={classes.primaryButton}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleUnfollow}
            variant="contained"
            color="primary"
            size="small"
        >
            {btnText}
        </Button>
    );
});

export default UnfollowListButton;
