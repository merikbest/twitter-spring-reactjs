import React, { FC, ReactElement, ReactNode } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";

import CloseButton from "../CloseButton/CloseButton";
import { useDialogTitleComponentStyles } from "./DialogTitleComponentStyles";

interface DialogTitleComponentProps {
    title?: string;
    onClose?: () => void;
    borderBottom?: boolean;
    children?: ReactNode;
}

const DialogTitleComponent: FC<DialogTitleComponentProps> = (
    {
        title,
        onClose,
        children,
        borderBottom
    }
): ReactElement => {
    const classes = useDialogTitleComponentStyles({ borderBottom });

    return (
        <DialogTitle className={classes.dialogTitle}>
            {onClose && <CloseButton onClose={onClose} />}
            {title}
            <div className={classes.button}>
                {children}
            </div>
        </DialogTitle>
    );
};

export default DialogTitleComponent;
