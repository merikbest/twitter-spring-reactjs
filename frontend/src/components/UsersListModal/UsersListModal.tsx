import React, { FC, ReactElement, useEffect, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import { List } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";

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
    selectRetweetedUsers,
    selectUsersPagesCount
} from "../../store/ducks/tweet/selectors";
import UsersItem, { UserItemSize } from "../UsersItem/UsersItem";
import Spinner from "../Spinner/Spinner";
import InfiniteScrollWrapper from "../InfiniteScrollWrapper/InfiniteScrollWrapper";
import DialogTitleComponent from "../DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../util/globalClasses";

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
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const isLiked = usersListModalAction === UsersListModalAction.LIKED;
    const isUsersLoading = useSelector(isLiked ? selectIsLikedUsersLoading : selectIsRetweetedUsersLoading);
    const users = useSelector(isLiked ? selectLikedUsers : selectRetweetedUsers);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        if (visible) {
            setTitle(isLiked ? "Liked by" : "Retweeted by");
            loadUsers(0);
        }
    }, [visible]);

    const loadUsers = (page: number): void => {
        dispatch(isLiked ? fetchLikedUsers({ tweetId, pageNumber: page }) : fetchRetweetedUsers({
            tweetId,
            pageNumber: page
        }));
    };

    const onCloseUsersListModal = (): void => {
        onClose();
        setTitle("");
        dispatch(resetLikedUsersState());
        dispatch(resetRetweetedUsersState());
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onCloseUsersListModal}>
            <DialogTitleComponent title={title} onClose={onCloseUsersListModal} />
            <DialogContent id="scrollableDiv" className={globalClasses.dialogContent}>
                <InfiniteScrollWrapper dataLength={users.length} pagesCount={usersPagesCount} loadItems={loadUsers}>
                    {isUsersLoading && !users.length ? (
                        <Spinner paddingTop={250} />
                    ) : (
                        <List>
                            {users.map((user) => (
                                <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM} />
                            ))}
                            {isUsersLoading && <Spinner />}
                        </List>
                    )}
                </InfiniteScrollWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default UsersListModal;
