import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent} from "@material-ui/core";
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

const ProfileDescriptionModal: FC<ProfileDescriptionModalProps> = ({
                                                                       open,
                                                                       onClose,
                                                                       text,
                                                                       onChangeText,
                                                                       onOpenProfileUpdatedModal
                                                                   }): ReactElement => {
    const classes = useProfileDescriptionModalStyles();

    return (
        <Dialog
            hideBackdrop={true}
            style={{height: 666, marginTop: 92}}
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{padding: "0 32px"}} className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <div className={classes.title}>
                    Describe yourself
                </div>
                <div className={classes.text}>
                    What makes you special? Don't think too hard, just have fun with it.
                </div>
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
                    fullWidth
                >
                    {text !== "" ? "Next" : "Skip for now"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileDescriptionModal;
