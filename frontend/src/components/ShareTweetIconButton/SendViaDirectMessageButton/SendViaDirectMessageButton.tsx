import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { MessagesIcon } from "../../../icons";
import { useModalWindow } from "../../../hook/useModalWindow";
import SendDirectTweetModal from "../SendDirectTweetModal/SendDirectTweetModal";

interface SendViaDirectMessageButtonProps {
    tweetId: number;
}

const SendViaDirectMessageButton: FC<SendViaDirectMessageButtonProps> = ({ tweetId }): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <>
            <ListItem id="clickSendViaDirectMessage" onClick={onOpenModalWindow}>
                <>{MessagesIcon}</>
                <Typography variant="body1" component="span">
                    {t("SEND_VIA_DIRECT_MESSAGE", { defaultValue: "Send via Direct Message" })}
                </Typography>
            </ListItem>
            <SendDirectTweetModal tweetId={tweetId} visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default SendViaDirectMessageButton;
