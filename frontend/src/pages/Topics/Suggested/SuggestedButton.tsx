import React, { FC, ReactElement } from "react";
import { Button } from "@material-ui/core";
import { useSuggestedStyles } from "./SuggestedStyles";

interface SuggestedButtonProps {
    text: string;
}

const SuggestedButton: FC<SuggestedButtonProps> = ({ text }): ReactElement => {
    const classes = useSuggestedStyles();

    return (
        <div className={classes.suggestedButton}>
            <Button variant={"contained"} color={"primary"}>
                {text}
            </Button>
        </div>
    );
};

export default SuggestedButton;
