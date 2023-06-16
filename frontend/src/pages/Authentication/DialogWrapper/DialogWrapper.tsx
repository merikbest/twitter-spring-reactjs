import React, { FC, ReactElement, ReactNode } from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useDispatch, useSelector } from "react-redux";

import { useDialogWrapperStyles } from "./DialogWrapperStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectIsLoading } from "../../../store/ducks/authentication/selector";
import { setCloseModal } from "../../../store/ducks/authentication/actionCreators";

interface DialogWrapperProps {
    isOpen: boolean;
    onClose?: () => void;
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
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const onClose = (): void => {
        dispatch(setCloseModal());
    };

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
