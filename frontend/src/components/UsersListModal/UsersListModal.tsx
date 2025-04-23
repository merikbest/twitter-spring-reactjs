import React, { FC, ReactElement, useCallback, useEffect, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import { List } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectUsersPagesCount } from "../../store/ducks/tweet/selectors";
import UsersItem, { UserItemSize } from "../UsersItem/UsersItem";
import InfiniteScrollWrapper from "../InfiniteScrollWrapper/InfiniteScrollWrapper";
import DialogTitleComponent from "../DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../util/globalClasses";
import { useUsersListActions } from "./useUsersListActions";
import Spinner from "../Spinner/Spinner";

interface UsersListModalProps {
    tweetId: number;
    usersListModalAction: UsersListModalAction;
    visible?: boolean;
    onClose: () => void;
}

export enum UsersListModalAction {
    LIKED = "LIKED",
    RETWEETED = "RETWEETED"
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
    const { t } = useTranslation();
    const {
        translationKey,
        defaultValue,
        fetchAction,
        resetAction,
        isLoadingSelector,
        usersSelector
    } = useUsersListActions(usersListModalAction);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const isUsersLoading = useSelector(isLoadingSelector);
    const users = useSelector(usersSelector);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        if (visible) {
            setTitle(t(translationKey, { defaultValue }));
            dispatch(fetchAction({ tweetId, pageNumber: 0 }));
        }
    }, [visible, tweetId, translationKey, defaultValue, fetchAction, t]);

    const loadUsers = useCallback((pageNumber: number): void => {
        dispatch(fetchAction({ tweetId, pageNumber }));
    }, [dispatch, fetchAction, tweetId]);

    const onCloseUsersListModal = useCallback((): void => {
        onClose();
        dispatch(resetAction());
    }, [onClose, dispatch, resetAction]);

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onCloseUsersListModal}>
            <DialogTitleComponent title={title} onClose={onCloseUsersListModal} />
            <DialogContent id="scrollableDiv" className={globalClasses.dialogContent}>
                <InfiniteScrollWrapper dataLength={users.length} pagesCount={usersPagesCount} loadItems={loadUsers}>
                    {isUsersLoading && users.length ? (
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
