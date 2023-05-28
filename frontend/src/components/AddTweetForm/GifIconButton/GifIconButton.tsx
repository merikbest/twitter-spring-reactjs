import React, { FC, ReactElement } from "react";

import { GifIcon } from "../../../icons";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { useModalWindow } from "../../../hook/useModalWindow";
import GifModalWindow from "./GifModalWindow/GifModalWindow";

interface GifIconButtonProps {

}

const GifIconButton: FC<GifIconButtonProps> = ({}): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ActionIconButton
                actionText={"GIF"}
                icon={GifIcon}
                onClick={onOpenModalWindow}
                size={"medium"}
            />
            <GifModalWindow visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default GifIconButton;
