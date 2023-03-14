import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { MessagesIcon } from "../../../icons";

interface SendViaDirectMessageButtonProps {
    onClickSendViaDirectMessage: () => void;
}

const SendViaDirectMessageButton: FC<SendViaDirectMessageButtonProps> = ({ onClickSendViaDirectMessage }): ReactElement => {

    return (
        <ListItem id={"clickSendViaDirectMessage"} onClick={onClickSendViaDirectMessage}>
            <>{MessagesIcon}</>
            <Typography variant={"body1"} component={"span"}>
                Send via Direct Message
            </Typography>
        </ListItem>
    );
};

export default SendViaDirectMessageButton;
