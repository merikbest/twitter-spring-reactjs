import {chatReducer, initialChatState} from "../reducer";
import {ChatActions, ChatActionsType} from "../contracts/actionTypes";
import {testActionDispatch} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../types/common";
import {mockChats} from "../../../../util/mockData/mockData";

describe("chatReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(chatReducer(undefined, {} as ChatActions)).toEqual(initialChatState);
        });
    });

    describe("chat handlers:", () => {
        testActionDispatch(
            ChatActionsType.SET_CHAT,
            chatReducer(initialChatState, {
                type: ChatActionsType.SET_CHAT,
                payload: mockChats[0]
            }),
            {
                ...initialChatState,
                item: mockChats[0],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ChatActionsType.RESET_CHAT_STATE,
            chatReducer(
                {
                    ...initialChatState,
                    item: mockChats[0],
                },
                {
                    type: ChatActionsType.RESET_CHAT_STATE,
                }
            ),
            {
                ...initialChatState,
                item: undefined,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ChatActionsType.SET_LOADING_STATE,
            chatReducer(initialChatState, {
                type: ChatActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialChatState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
