import React, {FC, ReactElement} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import {Button, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {useUnfollowModalStyles} from "./UnfollowModalStyles";
import {UserResponse} from "../../store/types/user";

interface UnfollowModalProps {
    user: UserResponse;
    visible?: boolean;
    onClose: () => void;
    handleUnfollow: (user: UserResponse) => void;
}

const UnfollowModal: FC<UnfollowModalProps> = ({user, visible, onClose, handleUnfollow}): ReactElement | null => {
    const classes = useUnfollowModalStyles();

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            onClick={(event) => handleClick(event)}
            aria-labelledby="form-dialog-title"
        >
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
