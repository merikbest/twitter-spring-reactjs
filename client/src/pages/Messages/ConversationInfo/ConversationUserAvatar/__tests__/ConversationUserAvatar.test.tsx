import React from "react";
import {Avatar} from "@material-ui/core";

import {mountWithStore} from "../../../../../util/testHelper";
import ConversationUserAvatar from "../ConversationUserAvatar";
import {mockUser} from "../../../../../util/mockData/mockData";
import {DEFAULT_PROFILE_IMG} from "../../../../../util/url";

describe("ConversationUserAvatar", () => {

    it("should render avatar", () => {
        const wrapper = mountWithStore(<ConversationUserAvatar avatar={mockUser.avatar}/>);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
    });

    it("should render default avatar", () => {
        const wrapper = mountWithStore(<ConversationUserAvatar/>);
        expect(wrapper.find(Avatar).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });
});
