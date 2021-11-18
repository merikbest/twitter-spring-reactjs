import React, {FC, ReactElement} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {useLogoutModalStyles} from "./LogoutModalStyles";

interface LogoutModalProps {
    visible?: boolean;
    onClose: () => void;
    handleSignOut: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({visible, onClose, handleSignOut}): ReactElement | null => {
    const classes = useLogoutModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogContent style={{padding: 0}}>
                <div className={classes.modalWrapper}>
                    <TwitterIcon />
                    <Typography className={classes.modalFullName}>
                        Log out of Twitter?
                    </Typography>
                    <div className={classes.modalUsername}>
                        You can always log back in at any time. If you just want to switch accounts,
                        you can do that by adding an existing account.
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
                            className={classes.modalLogoutButton}
                            onClick={handleSignOut}
                            variant="contained"
                            color="primary"
                        >
                            Log out
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutModal;
