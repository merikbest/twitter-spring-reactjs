import React, { FC, ReactElement, ReactNode } from "react";
import { Dialog, DialogContent, Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useProfileModalStyles } from "./ProfileModalStyles";
import FullWidthButton from "../../../../../components/Buttons/FullWidthButton/FullWidthButton";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    isComponentSelected: boolean;
    isProfileUpdated?: boolean;
    hideBackdrop?: boolean;
    children: ReactNode;
}

const ProfileModal: FC<ProfileModalProps> = (
    {
        isOpen,
        onClose,
        title,
        subtitle,
        onClick,
        isComponentSelected,
        isProfileUpdated,
        hideBackdrop,
        children
    }
): ReactElement => {
    const classes = useProfileModalStyles({ isProfileUpdated });

    return (
        <Dialog transitionDuration={0} open={isOpen} onClose={onClose} hideBackdrop={hideBackdrop}>
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon />
                </div>
                <Typography variant={"h3"} component={"div"} className={classes.title}>
                    {title}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {subtitle}
                </Typography>
                {children}
                {onClick && (
                    <FullWidthButton
                        onClick={onClick}
                        variant={isComponentSelected ? "contained" : "text"}
                        title={isComponentSelected ? "Next" : "Skip for now"}
                        size={"medium"}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ProfileModal;
