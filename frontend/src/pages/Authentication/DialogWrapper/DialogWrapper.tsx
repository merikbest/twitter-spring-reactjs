import React, { FC, ReactElement, ReactNode } from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useDialogWrapperStyles } from "./DialogWrapperStyles";
import { useDialogWrapper } from "./useDialogWrapper";

interface DialogWrapperProps {
    isOpen: boolean;
    onClose?: () => void;
    onClick?: any;
    disabledButton?: boolean;
    logo?: boolean;
    children?: ReactNode;
}

const DialogWrapper: FC<DialogWrapperProps> = (
    {
        isOpen,
        onClick,
        disabledButton,
        logo = true,
        children
    }
): ReactElement => {
    const classes = useDialogWrapperStyles();
    const { isLoading, onClose } = useDialogWrapper();

    return (
        <Dialog transitionDuration={0} open={isOpen} onClose={onClose}>
            <DialogContent className={classes.dialogContent}>
                {logo && (
                    <div className={classes.logoIcon}>
                        <TwitterIcon />
                    </div>
                )}
                {children}
                {onClick && (
                    <Button
                        className={classes.button}
                        onClick={onClick}
                        disabled={disabledButton || isLoading}
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth
                    >
                        Next
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default DialogWrapper;
