import React, {FC, ReactElement, useState} from "react";
import {ListItem, Typography} from "@material-ui/core";

import {MessagesIcon} from "../../../icons";
import SendDirectTweetModal from "../SendDirectTweetModal/SendDirectTweetModal";
import {TweetResponse} from "../../../store/types/tweet";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";
import {useSnackbar} from "../../../hook/useSnackbar";

interface SendViaDirectMessageButtonProps {
    tweetId: number;
    closeShareTweet: () => void;
}

const SendViaDirectMessageButton: FC<SendViaDirectMessageButtonProps> = ({tweetId, closeShareTweet}): ReactElement => {
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();
    const [visibleSendDirectTweetModal, setVisibleSendDirectTweetModal] = useState<boolean>(false);

    const onClickSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(true);
    };

    const onCloseSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(false);
    };

    const onSendDirectTweet = (): void => {
        setOpenSnackBar(true);
        setSnackBarMessage("Your Tweet was sent");
        closeShareTweet();
    };

    return (
        <>
            <ListItem id={"clickSendViaDirectMessage"} onClick={onClickSendViaDirectMessage}>
                <>{MessagesIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    Send via Direct Message
                </Typography>
            </ListItem>
            <SendDirectTweetModal
                tweetId={tweetId}
                visible={visibleSendDirectTweetModal}
                onSendDirectTweet={onSendDirectTweet}
                closeShareTweet={closeShareTweet}
                onClose={onCloseSendViaDirectMessage}
            />
            <ActionSnackbar
                snackBarMessage={snackBarMessage}
                openSnackBar={openSnackBar}
                onCloseSnackBar={onCloseSnackBar}
            />
        </>
    );
};

export default SendViaDirectMessageButton;
