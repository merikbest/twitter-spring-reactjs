import React, { memo, ReactElement } from "react";
import { Button } from "@material-ui/core";

import { useUserPageStyles } from "../UserPageStyles";
import { useCancelUserButton } from "./useCancelUserButton";

const CancelUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const { btnText, cancelFollow, onMouseOver, onMouseLeave } = useCancelUserButton();

    return (
        <Button
            className={classes.outlinedButton}
            onClick={cancelFollow}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            color="primary"
            variant="outlined"
            size="large"
        >
            {btnText}
        </Button>
    );
});

export default CancelUserButton;
