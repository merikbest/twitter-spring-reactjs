import { testAction } from "../../../../util/test-utils/test-helper";
import { fetchChat, resetChatState, setChat, setChatLoadingState } from "../actionCreators";
import { mockChats } from "../../../../util/test-utils/mock-test-data";
import { ChatActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("chat actions", () => {
    testAction(setChat, setChat(mockChats[0]), {
        type: ChatActionsType.SET_CHAT,
        payload: mockChats[0]
    });

    testAction(fetchChat, fetchChat(1), {
        type: ChatActionsType.FETCH_CHAT,
        payload: 1
    });

    testAction(resetChatState, resetChatState(), {
        type: ChatActionsType.RESET_CHAT_STATE
    });

    testAction(setChatLoadingState, setChatLoadingState(LoadingStatus.LOADING), {
        type: ChatActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
