import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useProfileDescriptionModalStyles} from "./ProfileDescriptionModalStyles";
import ProfileDescriptionInput from "./ProfileDescriptionInput/ProfileDescriptionInput";

interface ProfileDescriptionModalProps {
    open: boolean;
    onClose: () => void;
    text: string;
    onChangeText: (value: string | ((prevVar: string) => string)) => void;
    onOpenProfileUpdatedModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProfileDescriptionModal: FC<ProfileDescriptionModalProps> = (
    {
        open,
        onClose,
        text,
        onChangeText,
        onOpenProfileUpdatedModal
    }
): ReactElement => {
    const classes = useProfileDescriptionModalStyles();

    return (
        <Dialog
            hideBackdrop={true}
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <Typography variant={"h3"} component={"div"}>
                    Describe yourself
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    What makes you special? Don't think too hard, just have fun with it.
                </Typography>
                <ProfileDescriptionInput
                    value={text}
                    onChange={(event) => onChangeText(event.target.value)}
                    name={"about"}
                    label={"Your bio"}
                    maxTextLength={160}
                />
                <Button
                    className={classes.button}
                    onClick={() => onOpenProfileUpdatedModal(true)}
                    variant={(text !== "") ? "contained" : "text"}
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    {text !== "" ? "Next" : "Skip for now"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileDescriptionModal;
