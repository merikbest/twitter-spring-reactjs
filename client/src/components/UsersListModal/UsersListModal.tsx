import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import {User} from "../../store/ducks/user/contracts/state";
import Follower from "../FollowingFollowers/Follower";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {useHomeStyles} from "../../pages/Home/HomeStyles";

interface UsersListModalProps {
    classes: ReturnType<typeof useHomeStyles>;
    users?: User[];
    visible?: boolean;
    title: string;
    onClose: () => void;
}

const UsersListModal: FC<UsersListModalProps> = ({users, classes, visible, title, onClose}) => {
    const dispatch = useDispatch();

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{margin: 0}}>
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent style={{height: "550px", width: "600px", padding: "0px 0px"}}>
                {users?.map((user) => <Follower classes={classes} user={user} follow={handleFollow} unfollow={handleUnfollow}/>)}
            </DialogContent>
        </Dialog>
    );
};

export default UsersListModal;
