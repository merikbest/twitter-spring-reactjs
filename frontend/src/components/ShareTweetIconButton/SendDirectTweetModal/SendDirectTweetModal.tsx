import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Divider, List } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import classnames from "classnames";

import { useSendDirectTweetModalStyles } from "./SendDirectTweetModalStyles";
import { selectUsersPagesCount, selectUsersSearch } from "../../../store/ducks/usersSearch/selectors";
import { fetchChats } from "../../../store/ducks/chats/actionCreators";
import { selectChatsItems } from "../../../store/ducks/chats/selectors";
import {
    fetchParticipantsByUsername,
    resetUsersState,
    setUsersSearch
} from "../../../store/ducks/usersSearch/actionCreators";
import DirectUserItem from "./DirectUserItem/DirectUserItem";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { UserResponse } from "../../../types/user";
import InfiniteScrollWrapper from "../../InfiniteScrollWrapper/InfiniteScrollWrapper";
import SendDirectMessageFooter from "./SendDirectMessageFooter/SendDirectMessageFooter";
import { ChatResponse } from "../../../types/chat";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import UserChip from "../../UserChip/UserChip";
import ModalInput from "../../ModalInput/ModalInput";
import { useSelectUsers } from "../../../hook/useSelectUsers";
import DialogTitleComponent from "../../DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../util/globalClasses";

interface SendDirectTweetModalProps {
    tweetId: number;
    visible?: boolean;
    onClose: () => void;
}

const SendDirectTweetModal: FC<SendDirectTweetModalProps> = (
    {
        tweetId,
        visible,
        onClose
    }
): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useSendDirectTweetModalStyles();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const users = useSelector(selectUsersSearch);
    const chats = useSelector(selectChatsItems);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const [searchText, setSearchText] = useState<string>("");
    const { selectedIndexes, selectedUsers, handleDelete, handleListItemClick, resetSelectedUsers } = useSelectUsers();

    useEffect(() => {
        if (visible) {
            dispatch(fetchChats());
        }

        return () => {
            dispatch(resetUsersState());
        };
    }, [visible]);

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(resetUsersState());
            dispatch(fetchParticipantsByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
        } else {
            setSearchText("");
            dispatch(fetchChats());
            dispatch(setUsersSearch([]));
        }
    };

    const loadParticipants = (page: number): void => {
        dispatch(fetchParticipantsByUsername({ username: encodeURIComponent(searchText), pageNumber: page }));
    };

    const onSendMessageFinish = (): void => {
        dispatch(setOpenSnackBar("Your Tweet was sent"));
        setSearchText("");
        resetSelectedUsers();
        onClose();
    };

    const selectUserFromChat = (chat: ChatResponse): UserResponse => {
        if (chat.participants[0].user.id === myProfileId) {
            return chat.participants[1].user as UserResponse;
        } else {
            return chat.participants[0].user as UserResponse;
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogTitleComponent title={"Send Tweet"} onClose={onClose} borderBottom />
            <DialogContent id="scrollableDiv" className={classnames(globalClasses.dialogContent, classes.content)}>
                <ModalInput placeholder={"Search people"} searchText={searchText} onSearch={onSearch} />
                {selectedUsers && (selectedUsers.map((selectedUser) => (
                        <UserChip key={selectedUser.id} selectedUser={selectedUser} onDeleteUser={handleDelete} />
                    ))
                )}
                <Divider style={{ marginTop: 8 }} />
                <InfiniteScrollWrapper
                    dataLength={users.length}
                    pagesCount={usersPagesCount}
                    loadItems={loadParticipants}
                >
                    <List component="nav">
                        {(searchText ? users : chats).map((item) => {
                            const user = searchText ? item as UserResponse : selectUserFromChat(item as ChatResponse);

                            return (
                                <DirectUserItem
                                    key={item.id}
                                    user={user}
                                    userFromChat={searchText ? user.isUserChatParticipant : true}
                                    myProfileId={myProfileId!}
                                    selected={selectedIndexes.indexOf(user?.id!) !== -1}
                                    handleListItemClick={handleListItemClick}
                                />
                            );
                        })}
                    </List>
                </InfiniteScrollWrapper>
                <SendDirectMessageFooter
                    tweetId={tweetId}
                    selectedUsers={selectedUsers}
                    onSendMessageFinish={onSendMessageFinish}
                />
            </DialogContent>
        </Dialog>
    );
};

export default SendDirectTweetModal;
