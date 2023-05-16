import React, { FC, ReactElement, ReactNode } from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useDialogWrapperStyles } from "./DialogWrapperStyles";
import { useGlobalStyles } from "../../../util/globalClasses";

interface DialogWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    onClick?: any;
    disabledButton?: boolean;
    logo?: boolean;
    hideBackdrop?: boolean;
    modalShadow?: boolean;
    children?: ReactNode;
}

const DialogWrapper: FC<DialogWrapperProps> = (
    {
        isOpen,
        onClose,
        onClick,
        disabledButton,
        logo = true,
        hideBackdrop,
        modalShadow,
        children
    }
): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useDialogWrapperStyles();

    return (
        <Dialog
            className={modalShadow ? globalClasses.modalShadow : undefined}
            transitionDuration={0}
            open={isOpen}
            onClose={onClose}
            hideBackdrop={hideBackdrop}
        >
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
                        disabled={disabledButton}
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
