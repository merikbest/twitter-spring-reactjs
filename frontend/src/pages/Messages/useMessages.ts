import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchChats, resetChatsState } from "../../store/ducks/chats/actionCreators";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { selectChatsItems, selectIsChatsLoading } from "../../store/ducks/chats/selectors";
import { resetChatMessages } from "../../store/ducks/chatMessages/actionCreators";
import { resetChatState } from "../../store/ducks/chat/actionCreators";
import { resetUserProfileState } from "../../store/ducks/userProfile/actionCreators";
import { ChatResponse } from "../../types/chat";

export const useMessages = () => {
    const dispatch = useDispatch();
    const location = useLocation<{ removeParticipant: boolean | undefined }>();
    const myProfileId = useSelector(selectUserDataId);
    const chats = useSelector(selectChatsItems);
    const isChatsLoading = useSelector(selectIsChatsLoading);
    const [participantId, setParticipantId] = useState<number | undefined>(undefined);
    const [chatId, setChatId] = useState<number | undefined>(undefined);

    const handleListItemClick = useCallback((chat: ChatResponse): void => {
        setParticipantId((chat.participants[0].user.id === myProfileId)
            ? chat.participants[1].user.id
            : chat.participants[0].user.id);
        setChatId(chat.id);
    }, [myProfileId]);

    useEffect(() => {
        dispatch(fetchChats());

        return () => {
            dispatch(resetChatsState());
            dispatch(resetChatState());
            dispatch(resetUserProfileState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (location.state?.removeParticipant === true) {
            setParticipantId(undefined);
            dispatch(resetChatMessages());
            dispatch(resetChatState());
        }
    }, [location.state?.removeParticipant, dispatch]);

    return {
        chats,
        isChatsLoading,
        participantId,
        chatId,
        handleListItemClick
    };
};
