import React, { FC, ReactElement } from "react";
import { Button } from "@material-ui/core";

import { useFullWidthButtonStyles } from "./FullWidthButtonStyles";

interface FullWidthButtonProps {
    onClick: () => void;
    title: string;
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
}

const FullWidthButton: FC<FullWidthButtonProps> = ({ onClick, title, variant, size }): ReactElement => {
    const classes = useFullWidthButtonStyles();

    return (
        <Button
            onClick={onClick}
            className={classes.button}
            color="primary"
            variant={variant ?? "contained"}
            size={size ?? "large"}
            fullWidth
        >
            {title}
        </Button>
    );
};

export default FullWidthButton;
