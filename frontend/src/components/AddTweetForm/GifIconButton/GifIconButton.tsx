import React, { FC, memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { GifIcon } from "../../../icons";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { useModalWindow } from "../../../hook/useModalWindow";
import GifModalWindow from "./GifModalWindow/GifModalWindow";

const GifIconButton: FC = memo((): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <>
            <ActionIconButton
                actionText={t("GIF", { defaultValue: "GIF" })}
                icon={GifIcon}
                onClick={onOpenModalWindow}
                size="medium"
            />
            <GifModalWindow visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
});

export default GifIconButton;
