import React from "react";
import { Avatar } from "@material-ui/core";

import { mountWithStore } from "../../../../../util/test-utils/test-helper";
import ConversationUserAvatar from "../ConversationUserAvatar";
import { mockUser } from "../../../../../util/test-utils/mock-test-data";
import { DEFAULT_PROFILE_IMG } from "../../../../../constants/url-constants";

describe("ConversationUserAvatar", () => {

    it("should render avatar", () => {
        const wrapper = mountWithStore(<ConversationUserAvatar avatar={mockUser.avatar} />);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<ConversationUserAvatar />);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
