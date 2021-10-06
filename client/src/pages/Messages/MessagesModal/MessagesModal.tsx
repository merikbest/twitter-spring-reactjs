import React, {FC, FormEvent, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, InputAdornment, List, ListItem} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {useMessagesModalStyles} from "./MessagesModalStyles";
import {MessagesModalInput} from "./MessagesModalInput/MessagesModalInput"
import {fetchUsersSearchByUsername} from "../../../store/ducks/usersSearch/actionCreators";
import {selectUsersSearch} from "../../../store/ducks/usersSearch/selectors";
import MessagesModalUser from './MessagesModalUser/MessagesModalUser';
import {User} from "../../../store/ducks/user/contracts/state";
import {createChat} from "../../../store/ducks/chats/actionCreators";
import {SearchIcon} from "../../../icons";

interface MessagesModalProps {
    visible?: boolean;
    onClose: () => void;
}

const MessagesModal: FC<MessagesModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useMessagesModalStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectUsersSearch);
    const [text, setText] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const [selectedUser, setSelectedUser] = useState<User>();

    const handleClickSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchUsersSearchByUsername(encodeURIComponent(text)));
    };

    const handleClickAddUserToChat = (): void => {
        dispatch(createChat(selectedUser?.id!));
    };

    const handleListItemClick = (user: User): void => {
        setSelectedIndex(user.id);
        setSelectedUser(user);
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.header}>
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon color="secondary"/>
                </IconButton>
                <span className={classes.headerMessage}>New message</span>
                <Button
                    onClick={handleClickAddUserToChat}
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={selectedIndex === undefined}
                >
                    Next
                </Button>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <form onSubmit={handleClickSearch}>
                    <MessagesModalInput
                        fullWidth
                        placeholder="Explore people"
                        variant="outlined"
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SearchIcon}
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
                <div className={classes.divider}/>
                <List component="nav" aria-label="main mailbox folders">
                    {users.map((user) => (
                        <ListItem
                            button
                            selected={selectedIndex === user.id!}
                            onClick={() => handleListItemClick(user)}
                        >
                            <MessagesModalUser user={user}/>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default MessagesModal;
