import { testAction } from "../../../../util/test-utils/test-helper";
import {
    addChatMessage,
    addChatMessageWithTweet,
    fetchChatMessages,
    resetChatMessages,
    setChatMessage,
    setChatMessages,
    setChatMessagesLoadingState
} from "../actionCreators";
import { ChatMessagesActionsType } from "../contracts/actionTypes";
import { ChatMessageResponse } from "../../../../types/chat";
import { ChatMessageRequest, ChatMessageWithTweetRequest } from "../contracts/state";
import { LoadingStatus } from "../../../../types/common";

describe("chatMessages actions", () => {
    testAction(setChatMessages, setChatMessages([{ id: 1 }] as ChatMessageResponse[]), {
        type: ChatMessagesActionsType.SET_CHAT_MESSAGES,
        payload: [{ id: 1 }] as ChatMessageResponse[]
    });

    testAction(setChatMessage, setChatMessage({ id: 1 } as ChatMessageResponse), {
        type: ChatMessagesActionsType.SET_CHAT_MESSAGE,
        payload: { id: 1 } as ChatMessageResponse
    });

    testAction(addChatMessage, addChatMessage({ chatId: 1, text: "text" } as ChatMessageRequest), {
        type: ChatMessagesActionsType.ADD_CHAT_MESSAGE,
        payload: { chatId: 1, text: "text" } as ChatMessageRequest
    });

    testAction(addChatMessageWithTweet, addChatMessageWithTweet({
        text: "text",
        tweetId: 1,
        usersIds: [1, 2]
    } as ChatMessageWithTweetRequest), {
        type: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET,
        payload: { text: "text", tweetId: 1, usersIds: [1, 2] } as ChatMessageWithTweetRequest
    });

    testAction(fetchChatMessages, fetchChatMessages(1), {
        type: ChatMessagesActionsType.FETCH_CHAT_MESSAGES,
        payload: 1
    });

    testAction(resetChatMessages, resetChatMessages(), {
        type: ChatMessagesActionsType.RESET_CHAT_MESSAGES
    });

    testAction(setChatMessagesLoadingState, setChatMessagesLoadingState(LoadingStatus.LOADING), {
        type: ChatMessagesActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
