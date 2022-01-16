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
                    <Typography variant={"h5"} component={"div"}>
                        Unfollow {user?.fullName}?
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        Their Tweets will no longer show up in your home timeline. You can still view their
                        profile, unless their Tweets are protected.
                    </Typography>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onClose}
                            variant="contained"
                            size="large"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleUnfollow(user!)}
                            variant="contained"
                            color="primary"
                            size="large"
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
