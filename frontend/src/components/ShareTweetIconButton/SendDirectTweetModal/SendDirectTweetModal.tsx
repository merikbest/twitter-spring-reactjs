import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Chip, Dialog, InputAdornment, List } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";

import { useSendDirectTweetModalStyles } from "./SendDirectTweetModalStyles";
import { MessagesModalInput } from "../../../pages/Messages/MessagesModal/MessagesModalInput/MessagesModalInput";
import { selectUsersPagesCount, selectUsersSearch } from "../../../store/ducks/usersSearch/selectors";
import { fetchChats } from "../../../store/ducks/chats/actionCreators";
import { selectChatsItems } from "../../../store/ducks/chats/selectors";
import {
    fetchParticipantsByUsername,
    resetUsersState,
    setUsersSearch
} from "../../../store/ducks/usersSearch/actionCreators";
import { SearchIcon } from "../../../icons";
import DirectUserItem from "./DirectUserItem/DirectUserItem";
import CloseButton from "../../CloseButton/CloseButton";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { UserResponse } from "../../../types/user";
import InfiniteScrollWrapper from "../../InfiniteScrollWrapper/InfiniteScrollWrapper";
import SendDirectMessageFooter from "./SendDirectMessageFooter/SendDirectMessageFooter";
import { ChatResponse } from "../../../types/chat";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";

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
    const classes = useSendDirectTweetModalStyles();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const users = useSelector(selectUsersSearch);
    const chats = useSelector(selectChatsItems);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const [searchText, setSearchText] = useState<string>("");
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>([]);

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

    const handleDelete = (selectedUser: UserResponse) => (): void => {
        setSelectedIndexes((indexes) => indexes.filter((index) => index !== selectedUser.id));
        setSelectedUsers((users) => users.filter((user) => user.id !== selectedUser.id));
    };

    const handleListItemClick = (user: UserResponse): void => {
        const currentIndex = selectedIndexes.indexOf(user?.id!);
        const newChecked = [...selectedIndexes];
        const newSelectedUsers = [...selectedUsers];

        if (currentIndex === -1) {
            newChecked.push(user?.id!);
            newSelectedUsers.push(user);
        } else {
            newChecked.splice(currentIndex, 1);
            newSelectedUsers.splice(currentIndex, 1);
        }
        setSelectedIndexes(newChecked);
        setSelectedUsers(newSelectedUsers);
    };

    const onSendMessageFinish = (): void => {
        dispatch(setOpenSnackBar("Your Tweet was sent"));
        setSearchText("");
        setSelectedIndexes([]);
        setSelectedUsers([]);
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
        <Dialog open={visible}>
            <DialogTitle className={classes.header}>
                <CloseButton onClose={onClose} />
                Send Tweet
            </DialogTitle>
            <DialogContent id="scrollableDiv" className={classes.content}>
                <MessagesModalInput
                    fullWidth
                    placeholder="Search people"
                    variant="outlined"
                    onChange={(event) => onSearch(event.target.value)}
                    value={searchText}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {SearchIcon}
                            </InputAdornment>
                        )
                    }}
                />
                {selectedUsers && (
                    selectedUsers.map(selectedUser => (
                        <Chip
                            key={selectedUser.id}
                            avatar={
                                <Avatar
                                    alt={selectedUser?.fullName}
                                    src={selectedUser?.avatar ?? DEFAULT_PROFILE_IMG}
                                />
                            }
                            label={selectedUser?.fullName}
                            deleteIcon={<CloseIcon color="primary" />}
                            onDelete={handleDelete(selectedUser)}
                        />
                    ))
                )}
                <div className={classes.divider} />
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
