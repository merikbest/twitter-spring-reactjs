import React, {FC, ReactElement, useState} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import {useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import {useDeleteListModalStyles} from "./DeleteListModalStyles";
import {deleteList} from "../../../../../store/ducks/list/actionCreators";
import {LISTS} from "../../../../../util/pathConstants";

const DeleteListModal = (): ReactElement => {
    const classes = useDeleteListModalStyles()
    const dispatch = useDispatch();
    const history = useHistory();
    const {listId} = useParams<{ listId: string }>();
    const [visibleDeleteListModal, setVisibleDeleteListModal] = useState<boolean>(false);

    const onDeleteList = (): void => {
        setVisibleDeleteListModal(false);
        dispatch(deleteList(parseInt(listId)));
        history.push(LISTS);
    };

    const onOpenDeleteListModal = (): void => {
        setVisibleDeleteListModal(true);
    };

    const onCloseDeleteListModal = (): void => {
        setVisibleDeleteListModal(false);
    };

    return (
        <>
            <Typography
                id={"onOpenDeleteListModal"}
                className={classes.deleteList}
                onClick={onOpenDeleteListModal}
                variant={"body1"}
                component={"div"}
            >
                Delete List
            </Typography>
            <Dialog
                open={visibleDeleteListModal}
                onClose={onCloseDeleteListModal}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent style={{padding: 0}}>
                    <div className={classes.modalWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Delete List?
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            This can’t be undone and you’ll lose your List.
                        </Typography>
                        <div className={classes.modalButtonWrapper}>
                            <Button
                                className={classes.modalCancelButton}
                                onClick={onCloseDeleteListModal}
                                variant="contained"
                                size="large"
                            >
                                Cancel
                            </Button>
                            <Button
                                className={classes.modalDeleteButton}
                                onClick={onDeleteList}
                                variant="contained"
                                size="large"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DeleteListModal;
