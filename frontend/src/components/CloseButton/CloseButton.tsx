import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { useCloseButtonStyles } from "./CloseButtonStyles";
import { CloseIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";

interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClose }): ReactElement => {
    const classes = useCloseButtonStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.close}>
            <ActionIconButton
                actionText={t("CLOSE", { defaultValue: "Close" })}
                onClick={onClose}
                icon={CloseIcon}
            />
        </div>
    );
};

export default CloseButton;
