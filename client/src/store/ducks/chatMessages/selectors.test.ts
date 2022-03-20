import {selectChatMessagesItems, selectIsChatMessagesLoaded, selectIsChatMessagesLoading} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockChatMessageResponse} from "../../../util/testHelper";

describe("chatMessages selectors:", () => {
    
    describe("selectChatMessagesItems", () => {
        it("should return ChatMessageResponse array", () => {
            expect(selectChatMessagesItems(createMockRootState())).toBe(mockChatMessageResponse);
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
