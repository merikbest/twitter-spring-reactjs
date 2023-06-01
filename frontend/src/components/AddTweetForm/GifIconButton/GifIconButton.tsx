import React, { FC, ReactElement } from "react";

import { GifIcon } from "../../../icons";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { useModalWindow } from "../../../hook/useModalWindow";
import GifModalWindow from "./GifModalWindow/GifModalWindow";
import { GiphyDataProps } from "../../../types/tweet";

interface GifIconButtonProps {
    onClickSetGif: (gif: GiphyDataProps) => void;
}

const GifIconButton: FC<GifIconButtonProps> = ({ onClickSetGif }): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ActionIconButton
                actionText={"GIF"}
                icon={GifIcon}
                onClick={onOpenModalWindow}
                size={"medium"}
            />
            <GifModalWindow onClickSetGif={onClickSetGif} visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default GifIconButton;
