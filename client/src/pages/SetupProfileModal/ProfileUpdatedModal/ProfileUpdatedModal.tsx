import React, {FC, ReactElement} from 'react';
import {useProfileUpdatedModalStyles} from "./ProfileUpdatedModalStyles";
import {Button, Dialog, DialogContent} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

interface ProfileUpdatedModalProps {
    open: boolean;
    onClose: () => void;
}

const ProfileUpdatedModal: FC<ProfileUpdatedModalProps> = ({open, onClose}): ReactElement => {
    const classes = useProfileUpdatedModalStyles();

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
                    Your profile is updated
                </div>
                <div className={classes.buttonWrapper}>
                    <Button
                        className={classes.button}
                        // onClick={() => onOpenProfileUpdatedModal(true)}
                        variant="contained"
                        color="primary"
                    >
                        See profile
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileUpdatedModal;
