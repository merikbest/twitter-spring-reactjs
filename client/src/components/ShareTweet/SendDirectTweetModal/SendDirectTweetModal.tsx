import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Chip, Dialog, InputAdornment, List, ListItem} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";

import {useSendDirectTweetModalStyles} from "./SendDirectTweetModalStyles";
import {MessagesModalInput} from "../../../pages/Messages/MessagesModal/MessagesModalInput/MessagesModalInput";
import {selectUsersSearch} from "../../../store/ducks/usersSearch/selectors";
import {fetchChats} from "../../../store/ducks/chats/actionCreators";
import {selectChatsItems} from "../../../store/ducks/chats/selectors";
import {fetchUsersSearchByUsername, setUsersSearch} from "../../../store/ducks/usersSearch/actionCreators";
import {SearchIcon, SendMessageIcon} from "../../../icons";
import DirectUserItem from "./DirectUserItem/DirectUserItem";
import {SendDirectMessageInput} from "./SendDirectMessageInput";
import {addChatMessageWithTweet} from "../../../store/ducks/chatMessages/actionCreators";
import CloseButton from "../../CloseButton/CloseButton";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {TweetResponse} from "../../../store/types/tweet";
import {UserResponse} from "../../../store/types/user";

interface SendDirectTweetModalProps {
    tweet: TweetResponse;
    visible?: boolean;
    onSendDirectTweet: () => void;
    closeShareTweet: () => void;
    onClose: () => void;
}

const SendDirectTweetModal: FC<SendDirectTweetModalProps> = (
    {
        tweet,
        visible,
        onSendDirectTweet,
        closeShareTweet,
        onClose
    }
): ReactElement | null => {
    const classes = useSendDirectTweetModalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const users = useSelector(selectUsersSearch);
    const chats = useSelector(selectChatsItems);
    const [searchText, setSearchText] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>([]);

    useEffect(() => {
        if (visible) {
            dispatch(fetchChats());
        }
    }, [visible]);

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(fetchUsersSearchByUsername(encodeURIComponent(text)));
        } else {
            setSearchText("");
            dispatch(setUsersSearch([]));
        }
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

    const handleClickSendMessage = (): void => {
        dispatch(addChatMessageWithTweet({text: message, tweetId: tweet.id, usersIds: selectedUsers.map(user => user.id!)}));
        onSendDirectTweet();
        setSearchText("");
        setMessage("");
        setSelectedIndexes([]);
        setSelectedUsers([]);
        onClose();
        closeShareTweet();
    };

    const DirectUserItems: FC<{user: UserResponse}> = ({user}): JSX.Element => {
        return (
            <ListItem
                button
                disabled={user.isUserBlocked || user.isMyProfileBlocked || user.isMutedDirectMessages || user.id === myProfile?.id}
                selected={selectedIndexes.indexOf(user?.id!) !== -1}
                onClick={() => handleListItemClick(user)}
            >
                <DirectUserItem
                    user={user}
                    selected={selectedIndexes.indexOf(user?.id!) !== -1}
                />
            </ListItem>
        );
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.header}>
                <CloseButton onClose={onClose}/>
                Send Tweet
            </DialogTitle>
            <DialogContent className={classes.content}>
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
                        ),
                    }}
                />
                {selectedUsers && (
                    selectedUsers.map(selectedUser => (
                        <Chip
                            key={selectedUser.id}
                            avatar={
                                <Avatar
                                    alt={selectedUser?.fullName}
                                    src={selectedUser?.avatar?.src}
                                />
                            }
                            label={selectedUser?.fullName}
                            deleteIcon={<CloseIcon color="primary"/>}
                            onDelete={handleDelete(selectedUser)}
                        />
                    ))
                )}
                <div className={classes.divider}/>
                <List component="nav" aria-label="main mailbox folders">
                    {searchText ? (
                        users.map((user) => <DirectUserItems key={user.id} user={user}/>)
                    ) : (
                        chats.map((chat) => <DirectUserItems key={chat.id} user={
                            (chat.participants[0].user.id === myProfile?.id) ? (
                                chat.participants[1].user as UserResponse
                            ) : (
                                chat.participants[0].user as UserResponse
                            )}/>)
                    )}
                </List>
                <div className={classes.footer}>
                    <SendDirectMessageInput
                        multiline
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        variant="outlined"
                        placeholder="Add a comment"
                    />
                    <div className={classes.chatIcon}>
                        <IconButton
                            onClick={handleClickSendMessage}
                            disabled={selectedUsers.length === 0}
                            color="primary"
                            size="small"
                        >
                            <>{SendMessageIcon}</>
                        </IconButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SendDirectTweetModal;
