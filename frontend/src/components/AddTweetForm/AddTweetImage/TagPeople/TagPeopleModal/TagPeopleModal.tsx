import React, { FC, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogContent, List } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useTagPeopleModalStyles } from "./TagPeopleModalStyles";
import CloseButton from "../../../../CloseButton/CloseButton";
import {
    fetchUsersSearchByUsername,
    resetUsersState,
    setUsersSearch
} from "../../../../../store/ducks/usersSearch/actionCreators";
import { selectUsersPagesCount, selectUsersSearch } from "../../../../../store/ducks/usersSearch/selectors";
import InfiniteScrollWrapper from "../../../../InfiniteScrollWrapper/InfiniteScrollWrapper";
import TagPeopleItem from "./TagPeopleItem/TagPeopleItem";
import UserChip from "../../../../UserChip/UserChip";
import ModalInput from "../../../../ModalInput/ModalInput";
import { UserResponse } from "../../../../../types/user";

interface TagPeopleModalProps {
    visible?: boolean;
    onClose: () => void;
    selectedUsers: UserResponse[];
    handleDelete: (selectedUser: UserResponse) => void
    handleListItemClick: (user: UserResponse) => void,
}

const TagPeopleModal: FC<TagPeopleModalProps> = (
    {
        visible,
        onClose,
        selectedUsers,
        handleDelete,
        handleListItemClick
    }
): ReactElement | null => {
    const classes = useTagPeopleModalStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectUsersSearch);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const [searchText, setSearchText] = useState<string>("");

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(resetUsersState());
            dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
        } else {
            setSearchText("");
            dispatch(setUsersSearch([]));
        }
    };

    const loadParticipants = (page: number): void => {
        dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(searchText), pageNumber: page }));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitle className={classes.header}>
                <CloseButton onClose={onClose} />
                Tag people
                <Button
                    className={classes.button}
                    disabled={selectedUsers.length === 0}
                    onClick={onClose}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Done
                </Button>
            </DialogTitle>
            <DialogContent id="scrollableDiv" className={classes.content}>
                <ModalInput placeholder={"Search people"} searchText={searchText} onSearch={onSearch} />
                {selectedUsers && (selectedUsers.map((selectedUser) => (
                        <UserChip key={selectedUser.id} selectedUser={selectedUser} onDeleteUser={handleDelete} />
                    ))
                )}
                <div className={classes.divider} />
                <InfiniteScrollWrapper
                    dataLength={users.length}
                    pagesCount={usersPagesCount}
                    loadItems={loadParticipants}
                >
                    <List component="nav">
                        {users.map((user) => (
                            <TagPeopleItem key={user.id} user={user} handleListItemClick={handleListItemClick} />
                        ))}
                    </List>
                </InfiniteScrollWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default TagPeopleModal;
