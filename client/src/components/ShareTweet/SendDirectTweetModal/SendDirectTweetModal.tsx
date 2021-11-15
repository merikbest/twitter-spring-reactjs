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
import {User} from "../../../store/ducks/user/contracts/state";
import {fetchUsersSearchByUsername, setUsersSearch} from "../../../store/ducks/usersSearch/actionCreators";
import {SandMessageIcon, SearchIcon} from "../../../icons";
import DirectUserItem from "./DirectUserItem/DirectUserItem";
import {SendDirectMessageInput} from "./SendDirectMessageInput";
import {addChatMessageWithTweet} from "../../../store/ducks/chatMessages/actionCreators";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import CloseButton from "../../CloseButton/CloseButton";

interface SendDirectTweetModalProps {
    tweet: Tweet;
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
    const users = useSelector(selectUsersSearch);
    const chats = useSelector(selectChatsItems);
    const [searchText, setSearchText] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

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

    const handleDelete = (selectedUser: User) => (): void => {
        setSelectedIndexes((indexes) => indexes.filter((index) => index !== selectedUser.id));
        setSelectedUsers((users) => users.filter((user) => user.id !== selectedUser.id));
    };

    const handleListItemClick = (user: User): void => {
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
        dispatch(addChatMessageWithTweet({text: message, tweet: tweet, users: selectedUsers}));
        onSendDirectTweet();
        setSearchText("");
        setMessage("");
        setSelectedIndexes([]);
        setSelectedUsers([]);
        onClose();
        closeShareTweet();
    };

    const DirectUserItems = (user: User): JSX.Element => {
        return (
            <ListItem
                button
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
                        users.map((user) => <DirectUserItems {...user}/>)
                    ) : (
                        chats.map((chat) => <DirectUserItems {...chat.participants[1] as User}/>)
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
                    <span className={classes.chatIcon}>
                        <IconButton
                            onClick={handleClickSendMessage}
                            disabled={selectedUsers.length === 0}
                            color="primary"
                        >
                            <>{SandMessageIcon}</>
                        </IconButton>
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SendDirectTweetModal;
