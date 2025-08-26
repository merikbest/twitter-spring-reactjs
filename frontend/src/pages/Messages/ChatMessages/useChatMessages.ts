import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { selectUserProfile } from "../../../store/ducks/userProfile/selectors";
import { selectChatMessagesItems, selectIsChatMessagesLoading } from "../../../store/ducks/chatMessages/selectors";
import { fetchChat } from "../../../store/ducks/chat/actionCreators";
import { fetchChatParticipant } from "../../../store/ducks/userProfile/actionCreators";
import { fetchChatMessages, resetChatMessages } from "../../../store/ducks/chatMessages/actionCreators";
import { fetchReadMessages } from "../../../store/ducks/user/actionCreators";

export const useChatMessages = (participantId?: number, chatId?: number) => {
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const chatParticipant = useSelector(selectUserProfile);
    const messages = useSelector(selectChatMessagesItems);
    const isChatMessagesLoading = useSelector(selectIsChatMessagesLoading);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatId && participantId) {
            dispatch(fetchChat(chatId));
            dispatch(fetchChatParticipant({ participantId, chatId }));
            dispatch(fetchChatMessages(chatId));
            dispatch(fetchReadMessages(chatId));
        }

        return () => {
            dispatch(resetChatMessages());
        };
    }, [chatId, participantId]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return { myProfileId, chatParticipant, messages, isChatMessagesLoading, chatEndRef, };
};
