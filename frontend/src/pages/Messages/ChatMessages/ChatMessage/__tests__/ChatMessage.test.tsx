import React from "react";
import { Avatar } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { mockChats, mockMessages } from "../../../../../util/test-utils/mock-test-data";
import { formatChatMessageDate, formatDate } from "../../../../../util/format-date-helper";
import ChatMessage from "../ChatMessage";

describe("ChatMessage", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockUserMessage = mockMessages[0];
    const mockUserMessageWithTweet = mockMessages[3];
    const mockMyMessage = mockMessages[2];
    const mockChat = mockChats[0];
    const mockChatStore = { ...mockRootState, chat: { ...mockRootState.chat, item: mockChat } };

    it("should render participant message", () => {
        const wrapper = mountWithStore(<ChatMessage message={mockUserMessage} isParticipantMessage />, mockChatStore);
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockChat.participants[0].user.avatar);
        expect(wrapper.text().includes(mockUserMessage.text)).toBe(true);
        expect(wrapper.text().includes(formatChatMessageDate(new Date(mockUserMessage.date)))).toBe(true);
    });

    it("should render participant message with tweet", () => {
        const wrapper = mountWithStore(<ChatMessage message={mockUserMessageWithTweet}
                                                    isParticipantMessage />, mockChatStore);
        expect(wrapper.text().includes(formatDate(new Date(mockUserMessageWithTweet.tweet.dateTime)))).toBe(true);
    });

    it("should render participant message with deleted tweet", () => {
        const mockMessageDeletedTweet = {
            ...mockUserMessageWithTweet,
            tweet: { ...mockUserMessageWithTweet.tweet, isDeleted: true }
        };
        const wrapper = mountWithStore(<ChatMessage message={mockMessageDeletedTweet}
                                                    isParticipantMessage />, mockChatStore);
        expect(wrapper.text().includes("Tweet deleted")).toBe(true);
    });

    it("should render my message", () => {
        const wrapper = mountWithStore(<ChatMessage message={mockMyMessage}
                                                    isParticipantMessage={false} />, mockChatStore);
        expect(wrapper.text().includes(mockMyMessage.text)).toBe(true);
        expect(wrapper.text().includes(formatChatMessageDate(new Date(mockMyMessage.date)))).toBe(true);
        expect(wrapper.find("#checkIcon").exists()).toBeTruthy();
    });
});
