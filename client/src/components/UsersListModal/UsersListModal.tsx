import React, {FC, ReactElement} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {List} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {LikeTweet, Retweet} from "../../store/ducks/tweets/contracts/state";
import CloseButton from "../CloseButton/CloseButton";
import {useUsersListModalStyles} from "./UsersListModalStyles";
import UsersItem, {UserItemSize} from "../UsersItem/UsersItem";

interface UsersListModalProps {
    users?: LikeTweet[] | Retweet[];
    visible?: boolean;
    title: string;
    onClose: () => void;
}

const UsersListModal: FC<UsersListModalProps> = ({users, visible, title, onClose}): ReactElement | null => {
    const classes = useUsersListModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <CloseButton onClose={onClose}/>
                {title}
            </DialogTitle>
            <DialogContent className={classes.content}>
                <List>
                    {users?.map((user) => <UsersItem key={user.user.id} item={user.user} size={UserItemSize.MEDIUM}/>)}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default UsersListModal;
