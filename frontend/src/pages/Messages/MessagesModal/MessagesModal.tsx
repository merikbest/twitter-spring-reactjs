import React, { FC, FormEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, Divider, List, ListItem } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import classnames from "classnames";

import { useMessagesModalStyles } from "./MessagesModalStyles";
import {
    fetchUsersSearchByUsername,
    resetUsersState,
    setUsersSearch
} from "../../../store/ducks/usersSearch/actionCreators";
import { selectUsersPagesCount, selectUsersSearch } from "../../../store/ducks/usersSearch/selectors";
import MessagesModalUser from "./MessagesModalUser/MessagesModalUser";
import { createChat } from "../../../store/ducks/chats/actionCreators";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { UserResponse } from "../../../types/user";
import InfiniteScrollWrapper from "../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";
import ModalInput from "../../../components/ModalInput/ModalInput";
import DialogTitleComponent from "../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../util/globalClasses";

interface MessagesModalProps {
    visible?: boolean;
    onClose: () => void;
}

const MessagesModal: FC<MessagesModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useMessagesModalStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectUsersSearch);
    const myProfileId = useSelector(selectUserDataId);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const [text, setText] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [selectedUser, setSelectedUser] = useState<UserResponse>();

    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 })); // TODO add <InfiniteScroll/>
    };

    const onSearch = (text: string): void => {
        if (text) {
            setText(text);
            dispatch(resetUsersState());
            dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
        } else {
            setText("");
            dispatch(setUsersSearch([]));
        }
    };

    const loadParticipants = (page: number): void => {
        dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: page }));
    };

    const handleClickAddUserToChat = (): void => {
        dispatch(createChat(selectedUser?.id!));
        dispatch(setUsersSearch([]));
        onClose();
    };

    const handleListItemClick = (user: UserResponse): void => {
        if (!user.isMutedDirectMessages) {
            if (user.id !== selectedIndex) {
                setSelectedIndex(user.id);
                setSelectedUser(user);
            } else {
                setSelectedIndex(undefined);
                setSelectedUser(undefined);
            }
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitleComponent title={"New message"} onClose={onClose} borderBottom>
                <Button
                    onClick={handleClickAddUserToChat}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!selectedIndex}
                >
                    Next
                </Button>
            </DialogTitleComponent>
            <DialogContent id="scrollableDiv" className={classnames(globalClasses.dialogContent, classes.content)}>
                <InfiniteScrollWrapper
                    dataLength={users.length}
                    pagesCount={usersPagesCount}
                    loadItems={loadParticipants}
                >
                    <form onSubmit={handleSubmitSearch}>
                        <ModalInput placeholder={"Explore people"} searchText={text} onSearch={onSearch} />
                    </form>
                    <Divider />
                    <List component="nav">
                        {users.map((user) => (
                            <ListItem
                                key={user.id}
                                selected={selectedIndex === user.id!}
                                disabled={user.isMutedDirectMessages || user.id === myProfileId}
                                onClick={() => handleListItemClick(user)}
                                button
                            >
                                <MessagesModalUser user={user} />
                            </ListItem>
                        ))}
                    </List>
                </InfiniteScrollWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default MessagesModal;
