import {selectChatsItems, selectIsChatsLoaded, selectIsChatsLoading} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockChatResponse} from "../../../util/testHelper";

describe("chats selectors:", () => {
    
    describe("selectChatsItems", () => {
        it("should return ChatResponse array", () => {
            expect(selectChatsItems(createMockRootState())).toBe(mockChatResponse);
        });
    });

    describe("selectIsChatsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsChatsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsChatsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsChatsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
