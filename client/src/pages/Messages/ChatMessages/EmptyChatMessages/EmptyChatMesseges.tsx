import React, {FC, ReactElement} from "react";
import {Button, Typography} from "@material-ui/core";

import {useEmptyChatMessagesStyles} from "./EmptyChatMessagesStyles";

interface EmptyChatMessagesProps {
    onOpenModalWindow: () => void;
}

const EmptyChatMessages: FC<EmptyChatMessagesProps> = ({onOpenModalWindow}): ReactElement => {
    const classes = useEmptyChatMessagesStyles();

    return (
        <div className={classes.chatInfoWrapper}>
            <Typography variant={"h4"} component={"div"}>
                You don’t have a message selected
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                Choose one from your existing messages, or start a new one.
            </Typography>
            <Button
                onClick={onOpenModalWindow}
                className={classes.chatInfoButton}
                variant="contained"
                color="primary"
                size="large"
            >
                New message
            </Button>
        </div>
    );
};

export default EmptyChatMessages;
