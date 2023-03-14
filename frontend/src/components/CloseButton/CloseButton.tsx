import React, { FC, ReactElement } from "react";

import { useCloseButtonStyles } from "./CloseButtonStyles";
import { CloseIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";

interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClose }): ReactElement => {
    const classes = useCloseButtonStyles();

    return (
        <div className={classes.close}>
            <ActionIconButton actionText={"Close"} onClick={onClose} icon={CloseIcon} />
        </div>
    );
};

export default CloseButton;
