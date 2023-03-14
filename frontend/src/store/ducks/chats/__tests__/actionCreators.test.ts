import { testAction } from "../../../../util/test-utils/test-helper";
import {
    createChat,
    fetchChats,
    leaveFromConversation,
    resetChatsState,
    setChat,
    setChats,
    setChatsLoadingState
} from "../actionCreators";
import { ChatsActionsType } from "../contracts/actionTypes";
import { ChatResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

describe("chats actions", () => {
    testAction(setChats, setChats([{ id: 1 }] as ChatResponse[]), {
        type: ChatsActionsType.SET_CHATS,
        payload: [{ id: 1 }] as ChatResponse[]
    });

    testAction(setChat, setChat({ id: 1 } as ChatResponse), {
        type: ChatsActionsType.SET_CHAT,
        payload: { id: 1 } as ChatResponse
    });

    testAction(fetchChats, fetchChats(), {
        type: ChatsActionsType.FETCH_CHATS
    });

    testAction(createChat, createChat(1), {
        type: ChatsActionsType.CREATE_CHAT,
        payload: 1
    });

    testAction(leaveFromConversation, leaveFromConversation({ participantId: 1, chatId: 1 }), {
        type: ChatsActionsType.LEAVE_FROM_CONVERSATION,
        payload: { participantId: 1, chatId: 1 }
    });

    testAction(resetChatsState, resetChatsState(), {
        type: ChatsActionsType.RESET_CHATS_STATE
    });

    testAction(setChatsLoadingState, setChatsLoadingState(LoadingStatus.LOADING), {
        type: ChatsActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
