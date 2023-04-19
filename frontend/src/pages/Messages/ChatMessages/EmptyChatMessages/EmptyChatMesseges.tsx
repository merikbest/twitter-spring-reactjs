import React, { memo, ReactElement } from "react";
import { Button, Typography } from "@material-ui/core";

import { useEmptyChatMessagesStyles } from "./EmptyChatMessagesStyles";
import { useModalWindow } from "../../../../hook/useModalWindow";
import MessagesModal from "../../MessagesModal/MessagesModal";

const EmptyChatMessages = memo((): ReactElement => {
    const classes = useEmptyChatMessagesStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

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
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
});

export default EmptyChatMessages;
