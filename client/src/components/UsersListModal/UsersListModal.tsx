import React, {FC, ReactElement, useEffect, useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {List} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import CloseButton from "../CloseButton/CloseButton";
import {useUsersListModalStyles} from "./UsersListModalStyles";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchLikedUsers,
    fetchRetweetedUsers,
    resetLikedUsersState,
    resetRetweetedUsersState
} from "../../store/ducks/tweet/actionCreators";
import {
    selectIsLikedUsersLoading,
    selectIsRetweetedUsersLoading,
    selectLikedUsers,
    selectRetweetedUsers
} from "../../store/ducks/tweet/selectors";
import UsersItem, {UserItemSize} from "../UsersItem/UsersItem";
import Spinner from "../Spinner/Spinner";
import {UserResponse} from "../../store/types/user";

interface UsersListModalProps {
    tweetId: number;
    usersListModalAction: UsersListModalAction;
    visible?: boolean;
    onClose: () => void;
}

export enum UsersListModalAction {
    LIKED = "LIKED",
    RETWEETED = "RETWEETED",
    QUOTED = "QUOTED",
}

const UsersListModal: FC<UsersListModalProps> = (
    {
        tweetId,
        usersListModalAction,
        visible,
        onClose
    }
): ReactElement | null => {
    const classes = useUsersListModalStyles();
    const dispatch = useDispatch();
    const likedUsers = useSelector(selectLikedUsers);
    const retweetedUsers = useSelector(selectRetweetedUsers);
    const isLikedUsersLoading = useSelector(selectIsLikedUsersLoading);
    const isRetweetedUsersLoading = useSelector(selectIsRetweetedUsersLoading);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        if (visible) {
            if (usersListModalAction === UsersListModalAction.LIKED) {
                setTitle("Liked by");
                dispatch(fetchLikedUsers(tweetId));
            } else if (usersListModalAction === UsersListModalAction.RETWEETED) {
                setTitle("Retweeted by");
                dispatch(fetchRetweetedUsers(tweetId));
            } else if (usersListModalAction === UsersListModalAction.QUOTED) {
                setTitle("Quoted by");
                // dispatch(fetchQuotedUsers(tweetId));
            }
        }
    }, [visible]);

    const onCloseUsersListModal = (): void => {
        onClose();
        setTitle("");
        dispatch(resetLikedUsersState());
        dispatch(resetRetweetedUsersState());
    };

    if (!visible) {
        return null;
    }

    const showLoading = (): boolean => {
        let isLoading = true;

        if (usersListModalAction === UsersListModalAction.LIKED) {
            isLoading = isLikedUsersLoading;
        } else if (usersListModalAction === UsersListModalAction.RETWEETED) {
            isLoading = isRetweetedUsersLoading;
        }
        return isLoading;
    };

    const showUsersItem = (): JSX.Element[] => {
        let users: UserResponse[] = [];

        if (usersListModalAction === UsersListModalAction.LIKED) {
            users = likedUsers;
        } else if (usersListModalAction === UsersListModalAction.RETWEETED) {
            users = retweetedUsers;
        }
        return users.map((user) => (<UsersItem key={user.id} item={user} size={UserItemSize.MEDIUM}/>));
    };

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onCloseUsersListModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <CloseButton onClose={onCloseUsersListModal}/>
                {title}
            </DialogTitle>
            <DialogContent className={classes.content}>
                {showLoading() ? (
                    <Spinner paddingTop={250}/>
                ) : (
                    <List>
                        {showUsersItem()}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UsersListModal;
