import { FormEvent, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUsersSearchByUsername,
    resetUsersState,
    setUsersSearch
} from "../../../store/ducks/usersSearch/actionCreators";
import { selectUsersPagesCount, selectUsersSearch } from "../../../store/ducks/usersSearch/selectors";
import { createChat } from "../../../store/ducks/chats/actionCreators";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { UserResponse } from "../../../types/user";

export const useMessagesModal = (onClose: () => void) => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsersSearch);
    const myProfileId = useSelector(selectUserDataId);
    const usersPagesCount = useSelector(selectUsersPagesCount);

    const [text, setText] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

    const handleSubmitSearch = useCallback((event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
    }, [dispatch, text]);

    const onSearch = useCallback((text: string): void => {
        setText(text);
        if (text) {
            dispatch(resetUsersState());
            dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: 0 }));
        } else {
            dispatch(setUsersSearch([]));
        }
    }, [dispatch]);

    const loadParticipants = useCallback((page: number): void => {
        dispatch(fetchUsersSearchByUsername({ username: encodeURIComponent(text), pageNumber: page }));
    }, [dispatch, text]);

    const handleClickAddUserToChat = useCallback((): void => {
        if (selectedUser) {
            dispatch(createChat(selectedUser.id));
            dispatch(setUsersSearch([]));
            onClose();
        }
    }, [dispatch, selectedUser, onClose]);

    const handleListItemClick = useCallback((user: UserResponse): void => {
        if (!user.isMutedDirectMessages) {
            setSelectedUser((prev) => (prev?.id === user.id ? null : user));
        }
    }, []);

    const isNextButtonDisabled = useMemo(() => !selectedUser, [selectedUser]);

    return {
        text,
        users,
        usersPagesCount,
        myProfileId,
        selectedUser,
        isNextButtonDisabled,
        handleSubmitSearch,
        onSearch,
        loadParticipants,
        handleClickAddUserToChat,
        handleListItemClick,
    };
};
