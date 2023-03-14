import React, { FC, memo, MouseEvent, ReactElement, useState } from "react";
import { EmojiData, Picker } from "emoji-mart";
import { Popover } from "@material-ui/core";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { EmojiIcon } from "../../../icons";

interface EmojiIconButtonProps {
    addEmoji: (emoji: EmojiData) => void;
}

const EmojiIconButton: FC<EmojiIconButtonProps> = memo(({ addEmoji }): ReactElement => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

    const handleOpenPopup = (event: MouseEvent<HTMLDivElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

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
