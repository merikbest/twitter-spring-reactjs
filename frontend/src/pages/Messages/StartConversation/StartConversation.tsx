import React, { memo, ReactElement } from "react";
import { Button, Typography } from "@material-ui/core";

import { useStartConversationStyles } from "./StartConversationStyles";
import MessagesModal from "../MessagesModal/MessagesModal";
import { useMessagesModal } from "../MessagesModal/useMessagesModal";

const StartConversation = memo((): ReactElement => {
    const classes = useStartConversationStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useMessagesModal();

    return (
        <>
            <Typography variant={"h4"} component={"div"} className={classes.messagesTitle}>
                Send a message, get a message
            </Typography>
            <Typography variant={"subtitle1"} component={"div"} className={classes.messagesText}>
                Direct Messages are private conversations between you and other people on Twitter.
                Share Tweets, media, and more!
            </Typography>
            <Button
                onClick={onOpenModalWindow}
                className={classes.messagesButton}
                variant="contained"
                color="primary"
                size="large"
            >
                Start a conversation
            </Button>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default StartConversation;
