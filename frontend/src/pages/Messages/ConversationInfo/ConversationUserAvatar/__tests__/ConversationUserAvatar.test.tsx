import React from "react";
import { Avatar } from "@material-ui/core";

import { mountWithStore } from "../../../../../util/test-utils/test-helper";
import ConversationUserAvatar from "../ConversationUserAvatar";
import { mockUser } from "../../../../../util/test-utils/mock-test-data";

describe("ConversationUserAvatar", () => {

    it("should render avatar", () => {
        const wrapper = mountWithStore(<ConversationUserAvatar avatar={mockUser.avatar} />);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar);
    });
});
