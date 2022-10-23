import React, {FC, ReactElement, useState} from "react";
import {ListItem, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";

import {MessagesIcon} from "../../../icons";
import SendDirectTweetModal from "../SendDirectTweetModal/SendDirectTweetModal";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";

interface SendViaDirectMessageButtonProps {
    tweetId: number;
    closeShareTweet: () => void;
}

const SendViaDirectMessageButton: FC<SendViaDirectMessageButtonProps> = ({tweetId, closeShareTweet}): ReactElement => {
    const dispatch = useDispatch();
    const [visibleSendDirectTweetModal, setVisibleSendDirectTweetModal] = useState<boolean>(false);

    const onClickSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(true);
    };

    const onCloseSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(false);
    };

    const onSendDirectTweet = (): void => {
        dispatch(setOpenSnackBar("Your Tweet was sent"));
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
        </>
    );
};

export default SendViaDirectMessageButton;
