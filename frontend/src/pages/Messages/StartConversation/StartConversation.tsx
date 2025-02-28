import React, { memo, ReactElement } from "react";
import { Button, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useStartConversationStyles } from "./StartConversationStyles";
import MessagesModal from "../MessagesModal/MessagesModal";
import { useModalWindow } from "../../../hook/useModalWindow";

const StartConversation = memo((): ReactElement => {
    const classes = useStartConversationStyles();
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <Typography variant={"h4"} component={"div"} className={classes.messagesTitle}>
                {t("SEND_MESSAGE_TITLE", { defaultValue: "Send a message, get a message" })}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"} className={classes.messagesText}>
                {t("SEND_MESSAGE_DESCRIPTION", {
                    defaultValue: "Direct Messages are private conversations between you and other people on Twitter. Share Tweets, media, and more!" })}
            </Typography>
            <Button
                onClick={onOpenModalWindow}
                className={classes.messagesButton}
                variant="contained"
                color="primary"
                size="large"
            >
                {t("START_A_CONVERSATION", { defaultValue: "Start a conversation" })}
            </Button>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default StartConversation;
