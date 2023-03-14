import { chatMessagesReducer, initialChatMessagesState } from "../reducer";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { ChatMessageActions, ChatMessagesActionsType } from "../contracts/actionTypes";
import { ChatMessageResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

describe("chatMessagesReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(chatMessagesReducer(undefined, {} as ChatMessageActions)).toEqual(initialChatMessagesState);
        });
    });

    describe("chatMessages handlers:", () => {
        testActionDispatch(
            ChatMessagesActionsType.SET_CHAT_MESSAGES,
            chatMessagesReducer(initialChatMessagesState, {
                type: ChatMessagesActionsType.SET_CHAT_MESSAGES,
                payload: [{ id: 1 }] as ChatMessageResponse[]
            }),
            {
                ...initialChatMessagesState,
                items: [{ id: 1 }] as ChatMessageResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ChatMessagesActionsType.SET_CHAT_MESSAGE,
            chatMessagesReducer(
                {
                    ...initialChatMessagesState,
                    items: [{ id: 1, chat: { id: 1 } }] as ChatMessageResponse[]
                },
                {
                    type: ChatMessagesActionsType.SET_CHAT_MESSAGE,
                    payload: { id: 2, chat: { id: 1 } } as ChatMessageResponse
                }
            ),
            {
                ...initialChatMessagesState,
                items: [{ id: 1, chat: { id: 1 } }, { id: 2, chat: { id: 1 } }] as ChatMessageResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ChatMessagesActionsType.RESET_CHAT_MESSAGES,
            chatMessagesReducer(
                {
                    ...initialChatMessagesState,
                    items: [{ id: 1 }] as ChatMessageResponse[]
                },
                {
                    type: ChatMessagesActionsType.RESET_CHAT_MESSAGES
                }
            ),
            {
                ...initialChatMessagesState,
                items: [],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ChatMessagesActionsType.SET_LOADING_STATE,
            chatMessagesReducer(initialChatMessagesState, {
                type: ChatMessagesActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialChatMessagesState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
