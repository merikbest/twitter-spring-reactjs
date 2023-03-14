import React, { ChangeEvent, FC, memo, ReactElement, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";

import { useSendDirectTweetModalStyles } from "../SendDirectTweetModalStyles";
import { SendDirectMessageInput } from "../SendDirectMessageInput";
import { SendMessageIcon } from "../../../../icons";
import { addChatMessageWithTweet } from "../../../../store/ducks/chatMessages/actionCreators";
import { UserResponse } from "../../../../types/user";

interface SendDirectMessageFooterProps {
    tweetId: number;
    selectedUsers: UserResponse[];
    onSendMessageFinish: () => void;
}

const SendDirectMessageFooter: FC<SendDirectMessageFooterProps> = memo((
    {
        tweetId,
        selectedUsers,
        onSendMessageFinish
    }
): ReactElement => {
    const classes = useSendDirectTweetModalStyles();
    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");

    const handleClickSendMessage = (): void => {
        dispatch(addChatMessageWithTweet({
            text,
            tweetId,
            usersIds: selectedUsers.map((user) => user.id!)
        }));
        setText("");
        onSendMessageFinish();
    };

    const handleSetMessage = (event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
    };

    return (
        <div className={classes.footer}>
            <SendDirectMessageInput
                multiline
                value={text}
                onChange={handleSetMessage}
                variant="outlined"
                placeholder="Add a comment"
            />
            <div className={classes.chatIcon}>
                <IconButton
                    onClick={handleClickSendMessage}
                    disabled={selectedUsers.length === 0}
                    color="primary"
                    size="small"
                >
                    <>{SendMessageIcon}</>
                </IconButton>
            </div>
        </div>
    );
});

export default SendDirectMessageFooter;
