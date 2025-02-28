import React, { memo, ReactElement } from "react";
import { Button, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useEmptyChatMessagesStyles } from "./EmptyChatMessagesStyles";
import { useModalWindow } from "../../../../hook/useModalWindow";
import MessagesModal from "../../MessagesModal/MessagesModal";

const EmptyChatMessages = memo((): ReactElement => {
    const classes = useEmptyChatMessagesStyles();
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <div className={classes.chatInfoWrapper}>
            <Typography variant={"h4"} component={"div"}>
                {t("EMPTY_CHAT_MESSAGES_TITLE", { defaultValue: "You don’t have a message selected" })}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {t("EMPTY_CHAT_MESSAGES_DESCRIPTION", { defaultValue: "Choose one from your existing messages, or start a new one." })}
            </Typography>
            <Button
                onClick={onOpenModalWindow}
                className={classes.chatInfoButton}
                variant="contained"
                color="primary"
                size="large"
            >
                {t("NEW_MESSAGE", { defaultValue: "New message" })}
            </Button>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
});

export default EmptyChatMessages;
