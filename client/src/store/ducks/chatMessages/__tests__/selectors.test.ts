import {selectChatMessagesItems, selectIsChatMessagesLoaded, selectIsChatMessagesLoading} from "../selectors";
import {LoadingStatus} from "../../../types";
import {createMockRootState} from "../../../../util/testHelper";
import {mockMessages} from "../../../../util/mockData/mockData";

describe("chatMessages selectors:", () => {
    const mockState = createMockRootState();

    describe("selectChatMessagesItems", () => {
        it("should return ChatMessageResponse array", () => {
            expect(selectChatMessagesItems({
                ...mockState,
                chatMessages: {...mockState.chatMessages, items: mockMessages}
            })).toBe(mockMessages);
        });
    });

    describe("selectIsChatMessagesLoading", () => {
        it("should return correct result", () => {
            expect(selectIsChatMessagesLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsChatMessagesLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsChatMessagesLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
