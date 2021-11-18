import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useBlockUserModalStyles} from "./BlockUserModalStyles";

interface BlockUserModalProps {
    username: string;
    isUserBlocked: boolean;
    visible?: boolean;
    onClose: () => void;
    onBlockUser: () => void;
}

const BlockUserModal: FC<BlockUserModalProps> = (
    {
        username,
        isUserBlocked,
        visible,
        onClose,
        onBlockUser
    }
): ReactElement | null => {
    const classes = useBlockUserModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onClose}>
            <DialogContent>
                <Typography component={"div"} className={classes.title}>
                    {isUserBlocked ? "Unblock" : "Block"} @{username}
                </Typography>
                <Typography component={"div"} className={classes.text}>
                    {isUserBlocked ? (
                        "They will be able to follow you and view your Tweets."
                    ) : (
                        `They will not be able to follow you or view your Tweets, and you will not see Tweets or notifications from @${username}.`
                    )}
                </Typography>
                <Button
                    className={
                        classNames(
                            classes.containedButton,
                            isUserBlocked ? classes.unblockButton : classes.blockButton
                        )
                    }
                    onClick={onBlockUser}
                    color="primary"
                    variant="contained"
                    fullWidth
                >
                    {isUserBlocked ? "Unblock" : "Block"}
                </Button>
                <Button
                    className={classes.cancelButton}
                    onClick={onClose}
                    color="primary"
                    variant="outlined"
                    fullWidth
                >
                    Cancel
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default BlockUserModal;
