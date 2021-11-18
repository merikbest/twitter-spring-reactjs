import React, {FC, ReactElement} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import {Button, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {useUnfollowModalStyles} from "./UnfollowModalStyles";
import {User} from "../../store/ducks/user/contracts/state";

interface UnfollowModalProps {
    user: User;
    visible?: boolean;
    onClose: () => void;
    handleUnfollow: (user: User) => void;
}

const UnfollowModal: FC<UnfollowModalProps> = ({user, visible, onClose, handleUnfollow}): ReactElement | null => {
    const classes = useUnfollowModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogContent style={{padding: 0}}>
                <div className={classes.modalWrapper}>
                    <Typography className={classes.modalFullName}>
                        Unfollow {user?.fullName}?
                    </Typography>
                    <div className={classes.modalUsername}>
                        Their Tweets will no longer show up in your home timeline. You can still view their
                        profile, unless their Tweets are protected.
                    </div>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onClose}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.modalUnfollowButton}
                            onClick={() => handleUnfollow(user!)}
                            variant="contained"
                            color="primary"
                        >
                            Unfollow
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UnfollowModal;
