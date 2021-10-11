import React, {FC, ReactElement} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {useDeleteListModalStyles} from "./DeleteListModalStyles";

interface DeleteListModalProps {
    visible?: boolean;
    onClose: () => void;
    onDeleteList: () => void;
}

const DeleteListModal: FC<DeleteListModalProps> = ({visible, onClose, onDeleteList}): ReactElement | null => {
    const classes = useDeleteListModalStyles()

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{padding: 0}}>
                <div className={classes.modalWrapper}>
                    <Typography className={classes.modalFullName}>
                        Delete List?
                    </Typography>
                    <Typography className={classes.modalUsername}>
                        This can’t be undone and you’ll lose your List.
                    </Typography>
                    <div className={classes.modalButtonWrapper}>
                        <Button
                            className={classes.modalCancelButton}
                            onClick={onClose}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.modalDeleteButton}
                            onClick={onDeleteList}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteListModal;
