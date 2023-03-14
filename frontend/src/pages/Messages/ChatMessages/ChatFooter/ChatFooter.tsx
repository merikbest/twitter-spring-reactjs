import React, { FC, MouseEvent, ReactElement, useState } from "react";
import { Paper, Popover } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { EmojiData, Picker } from "emoji-mart";
import EmojiConvertor from "emoji-js";

import { EmojiIcon, GifIcon, MediaIcon, SendMessageIcon } from "../../../../icons";
import { MessageInput } from "../../MessageInput/MessageInput";
import { useChatFooterStyles } from "./ChatFooterStyles";
import { addChatMessage } from "../../../../store/ducks/chatMessages/actionCreators";
import ActionIcon from "../../ActionIcon/ActionIcon";

interface ChatFooterProps {
    chatId: number;
}

const ChatFooter: FC<ChatFooterProps> = ({ chatId }): ReactElement => {
    const classes = useChatFooterStyles();
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string>("");
    // Popover
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

    const onSendMessage = (): void => {
        if (message !== "") {
            dispatch(addChatMessage({ chatId: chatId, text: textConverter() }));
            setMessage("");
        }
    };

    const addEmoji = (emoji: EmojiData): void => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.replace_mode = "unified";
        const convertedEmoji = emojiConvertor.replace_colons(emoji.colons!);
        setMessage(message + " " + convertedEmoji);
    };

    const handleOpenPopup = (event: MouseEvent<HTMLDivElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const textConverter = (): string => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.colons_mode = true;
        return emojiConvertor.replace_unified(message);
    };

    return (
        <Paper className={classes.chatFooter}>
            <ActionIcon
                actionText={"Media"}
                className={"chatIcon"}
                icon={MediaIcon}
                positionTop
            />
            <ActionIcon
                actionText={"GIF"}
                className={"chatIcon"}
                icon={GifIcon}
                positionTop
            />
            <MessageInput
                multiline
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                variant="outlined"
                placeholder="Start a new message"
            />
            <div id={"handleOpenPopup"} onClick={handleOpenPopup}>
                <ActionIcon
                    actionText={"Emoji"}
                    className={"emojiIcon"}
                    icon={EmojiIcon}
                    positionTop
                />
            </div>
            <div style={{ marginLeft: 8 }}>
                <ActionIcon
                    onClick={onSendMessage}
                    actionText={"Send"}
                    className={"chatIcon"}
                    icon={SendMessageIcon}
                    disabled={message.length === 0}
                    positionTop
                />
            </div>
            <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Picker title="" emoji="wave" onSelect={addEmoji} set="twitter" />
            </Popover>
        </Paper>
    );
};

export default ChatFooter;
