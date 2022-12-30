import {createMockRootState} from "../../../../util/testHelper";
import {
    selectChatFirstParticipantAvatar,
    selectChatItem,
    selectChatSecondParticipantAvatar,
    selectChatSecondParticipantId
} from "../selectors";
import {mockChats} from "../../../../util/mockData/mockData";

describe("chat selectors:", () => {
    const mockState = createMockRootState();
    const mockChatResponse = {
        ...mockState,
        chat: {...mockState.chat, item: mockChats[0]}
    };

    describe("selectChatItem", () => {
        it("should return ChatResponse", () => {
            expect(selectChatItem(mockChatResponse)).toBe(mockChats[0]);
        });
    });

    describe("selectChatSecondParticipantId", () => {
        it("should return id number", () => {
            expect(selectChatSecondParticipantId(mockChatResponse)).toBe(mockChats[0].participants[1].user.id);
        });
    });

    describe("selectChatFirstParticipantAvatar", () => {
        it("should return avatar src", () => {
            expect(selectChatFirstParticipantAvatar(mockChatResponse)).toBe(mockChats[0].participants[0].user.avatar.src);
        });
    });

    describe("selectChatSecondParticipantAvatar", () => {
        it("should return avatar src", () => {
            expect(selectChatSecondParticipantAvatar(mockChatResponse)).toBe(mockChats[0].participants[1].user.avatar.src);
        });
    });
});
