import React from "react";

import { mountWithStore } from "../../../../../util/test-utils/test-helper";
import { mockUser } from "../../../../../util/test-utils/mock-test-data";
import ConversationUserInfo from "../ConversationUserInfo";

describe("ConversationUserInfo", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <ConversationUserInfo
                username={mockUser.username}
                fullName={mockUser.fullName}
                isPrivateProfile
            />);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
    });
});
