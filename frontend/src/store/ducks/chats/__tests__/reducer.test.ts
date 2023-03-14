import { chatsReducer, initialChatsState } from "../reducer";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { ChatsActions, ChatsActionsType } from "../contracts/actionTypes";
import { ChatResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";

describe("chatsReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(chatsReducer(undefined, {} as ChatsActions)).toEqual(initialChatsState);
        });
    });

    describe("chats handlers:", () => {
        testActionDispatch(
            ChatsActionsType.SET_CHATS,
            chatsReducer(initialChatsState, {
                type: ChatsActionsType.SET_CHATS,
                payload: [{ id: 1 }] as ChatResponse[]
            }),
            {
                ...initialChatsState,
                items: [{ id: 1 }] as ChatResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ChatsActionsType.SET_CHAT,
            chatsReducer(initialChatsState, {
                type: ChatsActionsType.SET_CHAT,
                payload: { id: 1 } as ChatResponse
            }),
            {
                ...initialChatsState,
                items: [{ id: 1 }] as ChatResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ChatsActionsType.LEAVE_FROM_CONVERSATION,
            chatsReducer(
                {
                    ...initialChatsState,
                    items: [{ id: 1 }] as ChatResponse[]
                },
                {
                    type: ChatsActionsType.LEAVE_FROM_CONVERSATION,
                    payload: { participantId: 1, chatId: 1 }
                }
            ),
            {
                ...initialChatsState,
                items: [],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ChatsActionsType.RESET_CHATS_STATE,
            chatsReducer(
                {
                    ...initialChatsState,
                    items: [{ id: 1 }] as ChatResponse[]
                },
                {
                    type: ChatsActionsType.RESET_CHATS_STATE
                }
            ),
            {
                ...initialChatsState,
                items: [],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ChatsActionsType.SET_LOADING_STATE,
            chatsReducer(initialChatsState, {
                type: ChatsActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialChatsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
