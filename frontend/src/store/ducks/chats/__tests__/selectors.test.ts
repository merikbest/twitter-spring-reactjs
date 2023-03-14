import { selectChatsItems, selectIsChatsLoaded, selectIsChatsLoading } from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockChats } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("chats selectors:", () => {
    const mockState = createMockRootState();

    describe("selectChatsItems", () => {
        it("should return ChatResponse array", () => {
            expect(selectChatsItems({
                ...mockState,
                chats: { ...mockState.chats, items: mockChats }
            })).toBe(mockChats);
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
