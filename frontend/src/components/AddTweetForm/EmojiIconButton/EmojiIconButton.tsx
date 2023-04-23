import React, { FC, memo, ReactElement } from "react";
import { EmojiData, Picker } from "emoji-mart";
import { Popover } from "@material-ui/core";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { EmojiIcon } from "../../../icons";
import { usePopup } from "../../../hook/usePopup";

interface EmojiIconButtonProps {
    addEmoji: (emoji: EmojiData) => void;
}

const EmojiIconButton: FC<EmojiIconButtonProps> = memo(({ addEmoji }): ReactElement => {
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();

    return (
        <>
            <ActionIconButton
                id={"onClickAddEmoji"}
                actionText={"Emoji"}
                icon={EmojiIcon}
                onClick={handleOpenPopup}
                size={"medium"}
            />
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
        </>
    );
});

export default EmojiIconButton;
